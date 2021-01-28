import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import massages from "./massages";
import progress from "./progress";
import infoUser from "./info/user";
import infoProject from "./info/project";
import user from "./user";
import projects from "./projects";
import pagination from "./pagination";
import tasks from "./tasks";
import chat from "./chat";
import server from "./server";

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
    infoUser,
    projects,
    infoProject,
    pagination,
    tasks,
    chat,
    server
  },
});
