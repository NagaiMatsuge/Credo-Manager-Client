import axios from "axios";

export default {
  state: {
    user: null,
    users: null,
  },
  mutations: {
    setUserCredentials(state, user) {
      state.user = user;
    },
    setUsersCredentials(state, users) {
      state.users = users;
    },
    clearUserCredentials(state) {
      state.user = null;
    },
  },
  actions: {
    async fetchUserCredentials({ commit }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const user = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/user`))
        .data;
      if (user.success) {
        commit("setUserCredentials", user.data);
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", user.message);
        commit("clearNotification");
      }
    },
    async fetchUsersCredentials({ commit }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const user = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/users`))
        .data;
      if (user.success) {
        commit("setUsersCredentials", user.data);
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", user.message);
        commit("clearNotification");
      }
    },
  },
  getters: {
    getUserCredentials: (s) => s.user,
    getUsersCredentials: (s) => s.users,
  },
};
