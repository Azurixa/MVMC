import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        // Auth routes
        {
            path: '/login',
            name: 'User login / token getting page',
            component: () => import('./views/auth/Login.vue')
        },
        // User routes
        {
            path: '/me/dashboard',
            name: 'User dashboard page',
            component: () => import('./views/user/Dashboard.vue')
        },
        // 404 path
        {
            path: '*',
            beforeEnter() {
                document.location.href = '/404';
            }
        },
        {
            path: '/404',
            name: '404 page not found page',
            component: () => import('./views/Error-404.vue')
        }
    ]
});
