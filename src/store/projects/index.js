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
        throw projects.message
      }
    },
    async fetchProjectsArchive({ commit }, res) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (
        await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects?archive=${res}`)
      ).data;
      if (projects.success) {
        commit("setProjects", projects.data);
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
      const projects = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/projects/create`,obj)).data;
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
    async createPayment({ commit, dispatch }, obj) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/payments/create`,obj)).data;
      if (projects.success) {

        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async editPayment({ commit, dispatch }, obj) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (await axios.put(`${process.env.VUE_APP_SERVICE_URL}/payments/update/${obj.id}`,obj)).data;
      if (projects.success) {
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async deleteStep({ commit, dispatch }, id) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/steps/delete/${id}`)).data;
      if (projects.success) {
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async deletePayment({ commit, dispatch }, id) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/payments/delete/${id}`)).data;
      if (projects.success) {
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", projects.message);
        commit("clearNotification");
        throw projects.message
      }
    },
    async archivePush({ commit, dispatch }, {id, status}) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const projects = (await axios.put(`${process.env.VUE_APP_SERVICE_URL}/projects/${id}/archive`, {status: status})).data;
      if (projects.success) {
      } else {
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
