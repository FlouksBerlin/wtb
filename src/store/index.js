import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "opiawdppopgf12",
      name: {
        firstName: "Peter",
        lastName: "Enis"
      }
    },
    timeEntries: [
      {
        id: "akuwd12",
        timeArrival: new Date(),
        timeLeaving: new Date()
      },
      {
        id: "likd3a2",
        timeArrival: new Date(),
        timeLeaving: new Date()
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
});
