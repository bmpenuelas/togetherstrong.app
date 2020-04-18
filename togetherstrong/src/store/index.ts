import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
    createMutationsSharer({
      predicate: ['setLoggedIn', 'userInputEmailMutation'],
    }),
  ],

  state: {
    loggedIn: false,
    userInputEmail: '',
  },

  mutations: {
    loggedInMutation(state, value) {
      state.loggedIn = value;
    },

    userInputEmailMutation(state, value) {
      state.userInputEmail = value;
    },
  },

  actions: {},

  modules: {},
});
