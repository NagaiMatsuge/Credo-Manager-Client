import axios from "axios";

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        async createUserCredentials({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const user = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/register`, obj)).data;
            if (user.success) {
                commit("setNotification", user.message);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", user.message);
                commit("clearNotification");
            }
        },
    },
    getters: {

    },
};
