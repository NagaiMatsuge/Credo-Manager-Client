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
            commit("removeProgress");
            if (user.success) {
                commit("setNotification", user.message);
            } else {
                commit("setError", user.message);
                throw user.message
            }

        },
        async deleteUser({ commit }, {id}) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;

            commit("setProgress", "start");
            const user = (await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/users/delete/${id}`)).data;
            commit("removeProgress");
            if (user.success) {
                commit("setNotification", user.message);
            } else {
                commit("setError", user.message);
                throw user.message
            }
        },
        async updateUser({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const user = (await axios.put(`${process.env.VUE_APP_SERVICE_URL}/users/update/${obj.id}`, obj)).data;
            commit("removeProgress");

            if (user.success) {
                commit("setNotification", user.message);
            } else {
                commit("setError", user.message);
                throw user.message
            }
        },
        async setingsUser({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const user = (await axios.put(`${process.env.VUE_APP_SERVICE_URL}/users/setting/update/${obj.id}`, obj)).data;
            commit("removeProgress");

            if (user.success) {
                commit("setNotification", user.message);
            } else {
                commit("setError", user.message);
                throw user.message
            }
        },
    },
    getters: {

    },
};
