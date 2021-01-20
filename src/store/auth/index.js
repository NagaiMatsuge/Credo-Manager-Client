import axios from "axios";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password, remember_me }) {
      commit("setProgress", "start");
      const user = (
        await axios.post(`${process.env.VUE_APP_SERVICE_URL}/login`, {
          email,
          password,
          remember_me,
        })
      ).data;
      commit("removeProgress");
      if (user.success) {
        localStorage.clear();
        localStorage.setItem("token", user.data._token);

        commit("setUserCredentials", user.data);
      } else {
        commit("setError", user.message);
        throw user.message;
      }
    },
    async logout({ dispatch, commit }) {
      commit("setProgress", "start");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.token}`;

      const user = (
        await axios.post(`${process.env.VUE_APP_SERVICE_URL}/logout`)
      ).data;
      commit("removeProgress");

      if (user.success) {
        localStorage.clear();
        commit("clearUserCredentials");
      } else {
        commit("setError", user.message);
        throw user.message;
      }
    },
    async passwordReset({ dispatch, commit }, { email }) {
      commit("setProgress", "start");

      const forgot = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/forgot`, {email})).data;

      if (forgot.success) {
        commit("setNotification", forgot.message);
        commit("removeProgress");

      } else {
        commit("removeProgress");
        commit("setError", forgot.message);
        throw forgot.message;
      }
    },
    async SetNewPassword({ dispatch, commit }, { password, token }) {
      commit("setProgress", "start");
      const newPassword = (
        await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/reset`, {
          password,
          token,
        })
      ).data;

      if (newPassword.success) {
        commit("removeProgress");
      } else {
        commit("removeProgress");
        commit("setError", newPassword.message);
        throw newPassword.message;
      }
    },
  },
};
