import axios from "axios";

export default {
  state: {
    user: null,
    userRename: null,
    users: null,
    roles: null
  },
  mutations: {
    setUserCredentials(state, user) {
      state.user = user;
    },
    setUser(state, user) {
      state.userRename = user;
    },
    setRole(state, roles) {
      state.roles = roles;
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
      commit("removeProgress");

      if (user.success) {
        commit("setUserCredentials", user.data);
      } else {
        commit("setError", user.message);
        throw user.message
      }
    },
    async fetchUsersCredentials({ commit }) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const user = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/users`))
        .data;
      commit("removeProgress");

      if (user.success) {
        commit("setUsersCredentials", user.data);
      } else {
        commit("setError", user.message);
        throw user.message
      }
    },
    async fetchUser({ commit }, {id}) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const user = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/users/${id}`))
        .data;
      commit("removeProgress");

      if (user.success) {
        commit("setUser", user.data);
      } else {
        commit("setError", user.message);
        throw user.message
      }
    },
    async fetchRoles({ commit }) {
      axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${localStorage.token}`;
      commit("setProgress", "start");
      const roles = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/params/roles`))
          .data;
      commit("removeProgress");

      if (roles.success) {
        commit("setRole", roles.data);
      } else {
        commit("setError", roles.message);
        throw roles.message
      }
    },
  },
  getters: {
    getUserCredentials: (s) => s.user,
    getUsersCredentials: (s) => s.users,
    getRoles: (s) => s.roles,
    getUserRename: (s) => s.userRename,
  },
};
