import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('makeup-token')
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        deleteToken(state) {
            localStorage.removeItem('makeup-token');
            state.token = undefined;
        }
    },
    getters: {
        token(state) {
            return state.token;
        },
        loggedIn(state) {
            if (state.token) {
                return true;
            } else {
                return false;
            }
        }
    },
    actions: {}
});
