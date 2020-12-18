import axios from "axios";

export default {
  state: {
    projects: null,
  },
  actions: {
    async fetchProjects({ commit }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (
        await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects`)
      ).data;
      if (projects.success) {
        commit("setProjects", projects.data);
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
      }
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    clearProjects(state) {
      state.projects = null;
    },
  },
  getters: {
    getProjects: (s) => s.projects,
  },
};
