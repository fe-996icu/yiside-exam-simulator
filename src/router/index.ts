import { createRouter , createWebHashHistory, createWebHistory } from 'vue-router'

import Welcome from '../views/welcome.vue'
import Exam from '../views/exam.vue'
import Result from '../views/result.vue'

const routes = [
	{
		path: '/',
		redirect: '/welcome',
	},
	{
		path: '/welcome',
		component: Welcome,
	},
	{
		path: '/exam',
		component: Exam,
	},
	{
		path: '/result',
		component: Result,
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;