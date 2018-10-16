import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    timeEntries: [
      {
        id: 'akuwd12',
        timeArrival: new Date(),
        timeLeaving: new Date()
      },
      {
        id: 'likd3a2',
        timeArrival: new Date(),
        timeLeaving: new Date()
      }
    ]
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    createTimeEntry(state, payload) {
      state.timeEntries.push(payload);
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          const newUser = {
            username: payload.username,
            timeEntries: []
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
          //TODO: actually handle errors
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          const newUser = {
            id: response.user.uid,
            timeEntries: [],
            username: response.user.username
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          //TODO: actually handle errors
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, timeEntries: [] });
    },
    fetchUserData({ commit, getters }) {
      firebase
        .database()
        .ref('/users/' + getters.user.id)
        .once('value')
        .then(data => {
          const updatedUser = {
            id: getters.user.id,
            username: data.val().username
          };
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
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
});
