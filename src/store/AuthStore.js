import axios from 'axios';

export default {
	state: {
		detailAuth: [],
	},
	getters: {
		getDetailAuth: (state) => {
			return state.detailAuth;
		},
	},
	actions: {
		async callLogin({ commit }, data) {
			const url =
				process.env.VUE_APP_API_URL +
				`users?username=${data.username}&password=${data.password}`;
			try {
				const res = await axios({
					url: url,
					method: 'GET',
					data,
				});
				if (res.data.length > 0) {
					const founded = {
						showSnackbar: true,
						textSnackbar: `Welcome ${res.data[0].name}`,
						statusSnackbar: 200,
						closeTargetSnackbar: '/',
					};
					commit('setLocalstorage', res.data[0]);
					commit('setDetailAuth', res.data[0]);
					commit('setSnackbar', founded);
					setTimeout(() => {
						window.location.href = '/';
					}, 1000);
					return 200;
				} else {
					const notFound = {
						showSnackbar: true,
						textSnackbar: 'Not Found',
						statusSnackbar: 400,
						closeTargetSnackbar: '',
					};
					commit('setSnackbar', notFound);
					return 400;
				}
			} catch (error) {
				return error.response;
			}
		},
		async callRegister({ commit }, data) {
			const url = process.env.VUE_APP_API_URL + 'users';
			try {
				const checkUsername = await axios({
					url: url,
					method: 'GET',
					data,
				});
				const found = checkUsername.data.find(
					(u) => u.username === data.username,
				);
				if (found) {
					const founded = {
						showSnackbar: true,
						textSnackbar: `Username already taken!`,
						statusSnackbar: 400,
						closeTargetSnackbar: '',
					};
					commit('setSnackbar', founded);
					return 400;
				} else {
					await axios({
						url: url,
						method: 'POST',
						data,
					}).then(() => {
						const success = {
							showSnackbar: true,
							textSnackbar: `Success Register, Try to login again`,
							statusSnackbar: 200,
							closeTargetSnackbar: '/login',
						};
						commit('setSnackbar', success);
						return 200;
					});
				}
			} catch (error) {
				return error.response;
			}
		},
		async callLogout({ commit }) {
			window.localStorage.removeItem('movieFestival');
			const success = {
				showSnackbar: true,
				textSnackbar: `See you later!`,
				statusSnackbar: 200,
				closeTargetSnackbar: '/',
			};
			commit('setSnackbar', success);
			setTimeout(() => {
				window.location.href = '/';
			}, 1000);
		},
		async callHandleVoteUser({ commit, state }, data) {
			const index = state.detailAuth.voted.findIndex((u) => u == data.id);
			const voted =
				index !== -1
					? [...state.detailAuth.voted.splice(index, 1)]
					: state.detailAuth.voted.push(parseInt(data.id));
			const payload = {
				...state.detailAuth,
				vote: voted,
			};
			delete payload.expired;
			const url = process.env.VUE_APP_API_URL + `users/${payload.id}`;
			return new Promise((resolve, reject) => {
				axios({
					url: url,
					method: 'PUT',
					data: payload,
				})
					.then(() => {
						commit('setDetailAuth', payload);
						commit('setLocalstorage', payload);
						commit('setLoading', false);
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	},
	mutations: {
		setLocalstorage: (_, data) => {
			window.localStorage.setItem(
				'movieFestival',
				JSON.stringify({
					...data,
					expired: Date.now() + 60 * 60 * 1000,
				}),
			);
		},
		setDetailAuth: (state, data) => {
			state.detailAuth = data;
		},
	},
};
