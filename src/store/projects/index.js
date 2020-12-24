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
        commit("setProjects", projects.data.data);
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async createProject({ commit, dispatch }, obj) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (
        await axios.post(
            `${process.env.VUE_APP_SERVICE_URL}/projects/create`,
            obj,{
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
        )
      ).data;
      if (projects.success) {
        dispatch("fetchProjects");
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async putProject({ commit, dispatch }, obj) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (
        await axios.put(`${process.env.VUE_APP_SERVICE_URL}/projects/update/${obj.project.id}`, obj)
      ).data;
      if (projects.success) {
        dispatch("fetchProjects");
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
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
