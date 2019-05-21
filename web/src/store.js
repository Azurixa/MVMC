import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('makeup-token'),
        user: {},
        apiUrl: 'http://mvtthew.pl:5050/'
    },
    mutations: {
        setToken(state, token) {
            localStorage.setItem('makeup-token', token);
            state.token = token;
        },
        deleteToken(state) {
            localStorage.removeItem('makeup-token');
            state.token = '';
        },
        getUser(state) {
            state.user = new Promise(resolve => {
                fetch(state.apiUrl + 'users/me', {
                    headers: {
                        Authorization: state.token
                    }
                })
                    .then(res => res.json())
                    .then(user => {
                        resolve(user);
                    });
            });
        }
    },
    getters: {
        apiUrl(state) {
            return state.apiUrl;
        },
        token(state) {
            return state.token;
        },
        loggedIn(state) {
            if (state.token !== null) {
                return true;
            } else {
                return false;
            }
        },
        user(state) {
            return state.user;
        }
    },
    actions: {}
});
