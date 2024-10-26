import { createStore } from 'vuex';
import AuthStore from './AuthStore';
import MovieStore from './MovieStore';

export default createStore({
	state: {
		loading: true,
		showSnackbar: false,
		textSnackbar: '',
		statusSnackbar: 0,
		closeTargetSnackbar: '',
	},
	getters: {
		getLoading: (state) => {
			return state.loading
		},
		getShowSnackbar: (state) => {
			return state.showSnackbar;
		},
		getTextSnackbar: (state) => {
			return state.textSnackbar;
		},
		getStatusSnackbar: (state) => {
			return state.statusSnackbar;
		},
		getCloseTargetSnackbar: (state) => {
			return state.closeTargetSnackbar;
		},
	},
	mutations: {
		setSnackbar: (state, data) => {
			state.showSnackbar = data.showSnackbar;
			state.textSnackbar = data.textSnackbar;
			state.statusSnackbar = data.statusSnackbar;
			state.closeTargetSnackbar = data.closeTargetSnackbar;
		},
		setLoading: (state, data) => {
			state.loading = data;
		},
	},
	actions: {},
	modules: { AuthStore, MovieStore },
});
