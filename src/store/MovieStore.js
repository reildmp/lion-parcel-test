import axios from 'axios';

export default {
	state: {
		listMovie: [],
		pageMovie: 1,
		perPageMovie: 6,
		totalPageMovie: 1,
		totalMovie: 0,
		sortMovie: '_sort=-view',
	},
	getters: {
		getListMovie: (state) => {
			return state.listMovie;
		},
		getPageMovie: (state) => {
			return state.pageMovie;
		},
		getPerPageMovie: (state) => {
			return state.perPageMovie;
		},
		getTotalPageMovie: (state) => {
			return state.totalPageMovie;
		},
		getTotalMovie: (state) => {
			return state.totalMovie;
		},
		getSortMovie: (state) => {
			return state.sortMovie;
		},
	},
	actions: {
		async callListMovie({ commit, state }) {
			const url =
				process.env.VUE_APP_API_URL +
				`movies?_page=${state.pageMovie}&_per_page=${state.perPageMovie}&${state.sortMovie}`;
			return new Promise((resolve, reject) => {
				axios({
					url: url,
					method: 'GET',
				})
					.then((res) => {
						commit('setListMovie', res.data.data);
						commit('setTotalPageMovie', res.data.last);
						commit('setTotalMovie', res.data.items);
						commit('setLoading', false);
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async callAddMovie({ state, commit, dispatch }, data) {
			const payload = {
				id: state.totalMovie,
				duration: 15,
				vote: 0,
				view: 0,
				...data,
			};
			const url = process.env.VUE_APP_API_URL + 'movies';
			return new Promise((resolve, reject) => {
				axios({
					url: url,
					method: 'POST',
					data: payload,
				})
					.then(() => {
						dispatch('callListMovie');
						commit('setLoading', false);
						const success = {
							showSnackbar: true,
							textSnackbar: `Add successfully!`,
							statusSnackbar: 200,
							closeTargetSnackbar: '',
						};
						commit('setSnackbar', success);
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async callEditMovie({ commit, dispatch }, data) {
			const url = process.env.VUE_APP_API_URL + `movies/${data.id}`;
			return new Promise((resolve, reject) => {
				axios({
					url: url,
					method: 'PUT',
					data,
				})
					.then(() => {
						dispatch('callListMovie');
						commit('setLoading', false);
						const success = {
							showSnackbar: true,
							textSnackbar: `Update successfully!`,
							statusSnackbar: 200,
							closeTargetSnackbar: '',
						};
						commit('setSnackbar', success);
						resolve();
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async callAddView({ commit, dispatch }, data) {
			const url = process.env.VUE_APP_API_URL + `movies/${data.id}`;
			return new Promise((resolve, reject) => {
				axios({
					url: url,
					method: 'PUT',
					data: {
						...data,
						view: data.view + 1,
					},
				})
					.then(() => {
						dispatch('callListMovie');
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
		setListMovie: (state, data) => {
			state.listMovie = data;
		},
		setPageMovie: (state, data) => {
			state.pageMovie = data;
		},
		setPerPageMovie: (state, data) => {
			state.perPageMovie = data;
		},
		setTotalPageMovie: (state, data) => {
			state.totalPageMovie = data;
		},
		setTotalMovie: (state, data) => {
			state.totalMovie = data;
		},
		setSortMovie: (state, data) => {
			state.sortMovie = data;
		},
	},
};
