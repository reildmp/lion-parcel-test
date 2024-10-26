import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AdminMovieView from '@/views/Admin/AdminMovieView.vue';

const token = window.localStorage.getItem('movieFestival');
let expired = false;
if (token !== null) {
	expired = Date.now() > JSON.parse(token).expired;
} else {
	expired = true;
}
if (expired) {
	localStorage.removeItem('movieFestival');
}

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		beforeEnter(to, from, next) {
			if (!expired) {
				next('/');
			} else {
				next();
			}
		},
	},
	{
		path: '/register',
		name: 'register',
		component: RegisterView,
		beforeEnter(to, from, next) {
			if (!expired) {
				next('/');
			} else {
				next();
			}
		},
	},
	{
		path: '/admin-movie',
		name: 'admin-movie',
		component: AdminMovieView,
		beforeEnter(to, from, next) {
			if (!expired) {
				if (JSON.parse(token).type === 0) {
					next();
				} else {
					next('/')
				}
			} else {
				next('/login');
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
