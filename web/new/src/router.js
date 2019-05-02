import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import store from './store';

Vue.use(Router);

const router = new Router({
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
            path: '/auth',
            name: 'User login / register / token getting page',
            beforeEnter(from, to, next) {
                if (store.getters.loggedIn) {
                    document.location.href = '/me/dashboard';
                } else {
                    next();
                }
            },
            component: () => import('./views/auth/Auth.vue')
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
        {
            path: '/me/new',
            name: 'Product / user creation of new cateogy / brand / product',
            beforeEnter(from, to, next) {
                if (!store.getters.loggedIn) {
                    document.location.href = '/login';
                } else {
                    next();
                }
            },
            component: () => import('./views/user/New.vue')
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

// Global before enter
router.beforeEach((from, to, next) => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
        if (navbar.classList.contains('show')){
            document.querySelector('.navbar-toggler').click();
        }
    }
    next();
});

export default router;
