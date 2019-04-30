import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import store from './store';

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
            beforeEnter(from, to, next) {
                if (store.getters.loggedIn) {
                    document.location.href = '/me/dashboard';
                } else {
                    next();
                }
            },
            component: () => import('./views/auth/Login.vue')
        },
        {
            path: '/register',
            name: 'User register next login / token getting page',
            beforeEnter(from, to, next) {
                if (store.getters.loggedIn) {
                    document.location.href = '/me/dashboard';
                } else {
                    next();
                }
            },
            component: () => import('./views/auth/Register.vue')
        },
        {
            path: '/logout',
            name: 'User logout and delete token',
            beforeEnter() {
                store.commit('deleteToken');
                document.location.href = '/login';
            }
        },
        // User routes
        {
            path: '/me/dashboard',
            name: 'User dashboard page',
            beforeEnter(from, to, next) {
                if (!store.getters.loggedIn) {
                    document.location.href = '/login';
                } else {
                    next();
                }
            },
            component: () => import('./views/user/Dashboard.vue')
        },
        {
            path: '/me/edit',
            name: 'User profile edit page',
            beforeEnter(from, to, next) {
                if (!store.getters.loggedIn) {
                    document.location.href = '/login';
                } else {
                    next();
                }
            },
            component: () => import('./views/user/Edit.vue')
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
