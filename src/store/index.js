import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    createTimeEntry(state, payload) {
      state.timeEntries.push(payload);
    },

    setLoading(state, payload) {
      state.loading = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    clearError(state) {
      state.error = null;
    }
  },

  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setLoading', false);
          const newUser = {
            username: payload.username,
            timeEntries: [
              {
                id: 'ajskdu1',
                timeArrival: new Date(),
                timeLeaving: new Date(+1549754588884),
                overtime: -1
              },
              {
                id: 'pawl827',
                timeArrival: new Date(),
                timeLeaving: new Date(+1599754588884),
                overtime: +2
              }
            ]
          };
          //store in firebase
          firebase
            .database()
            .ref('users')
            .child(response.user.uid)
            .set(newUser)
            .catch(error => {
              //TODO: actually handle errors
              console.log(error);
            });
          //store in vuex
          newUser.id = response.user.uid;
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },

    signUserIn({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setLoading', false);
          const newUser = {
            id: response.user.uid
          };
          commit('setUser', newUser);
          dispatch('fetchUserData');
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error);
        });
    },

    autoSignIn({ commit }, payload) {
      const newUser = {
        id: payload.uid,
        username: payload.username
      };
      commit('setUser', newUser);
    },

    fetchUserData({ commit, getters }) {
      firebase
        .database()
        .ref('/users/' + getters.user.id)
        .once('value')
        .then(data => {
          const updatedUser = {
            id: getters.user.id,
            ...data.val()
          };
          //console.log('fetchUserData run', updatedUser);
          commit('setUser', updatedUser);
        })
        .catch(error => {
          //TODO: actually handle errors
          console.log(error);
        });
    },

    signOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },

    createTimeEntry({ commit }, payload) {
      const timeEntry = {
        timeArrival: payload.timeArrival,
        timeLeaving: payload.timeLeaving
      };
      commit('createTimeEntry', timeEntry);
    },

    clearError({ commit }) {
      commit('clearError');
    }
  },

  getters: {
    user(state) {
      return state.user;
    },

    loading(state) {
      return state.loading;
    },

    error(state) {
      return state.error;
    }
  }
});
