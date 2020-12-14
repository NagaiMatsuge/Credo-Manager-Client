import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import massages from "./massages";
import progress from "./progress";
import user from "./info/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    massages,
    progress,
    user,
  },
});
