import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createMutationsSharer from 'vuex-shared-mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
    createMutationsSharer({
      predicate: ['loggedInMutation', 'userMutation'],
    }),
  ],

  state: {
    loggedIn: false,
    firebaseUser: {}, // user object from firebase auth
    user: {}, // user object with the fields used by this app
    userInputEmail: '',
    userInputPhone: '',
    tokenGoogle: '',
  },

  mutations: {
    loggedInMutation(state, value) {
      state.loggedIn = value;
    },

    userInputEmailMutation(state, value) {
      state.userInputEmail = value;
    },

    userInputPhoneMutation(state, value) {
      state.userInputPhone = value;
    },

    userMutation(state, value) {
      state.user = value;
    },

    firebaseUserMutation(state, value) {
      state.firebaseUser = value;
    },

    tokenGoogleMutation(state, value) {
      state.tokenGoogle = value;
    },
  },

  actions: {
    setUserAction({ commit }, user) {
      commit('loggedInMutation', user !== null);
      commit('firebaseUserMutation', user || {});
      if (user) {
        commit('userMutation', {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        commit('userMutation', {});
      }
    },
  },

  modules: {},
});
