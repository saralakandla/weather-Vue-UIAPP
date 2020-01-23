import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    forecastHistory: []
  },
  mutations: {
    change(state, forecastHistory) {
      state.forecastHistory = forecastHistory;
    }
  },
  getters: {
    forecastHistory: state => state.forecastHistory
  }
});
