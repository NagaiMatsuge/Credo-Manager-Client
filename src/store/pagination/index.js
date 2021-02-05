import axios from "axios";

export default {
    actions: {
        async paginationLink({ commit }, {url, name}) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const projects = ( await axios.get(url) ).data;
            console.log(url)
            if (projects.success) {
                if (name === 'tasks'){
                    commit("setTask", projects);
                }
                if (name === 'payments'){
                    commit("setPayments", projects);
                }
                if (name === 'user'){
                    commit("setUsersCredentials", projects.data);
                }
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", projects.message);
                commit("clearNotification");
                throw projects.message
            }
        },
        async paginationScrollLink({ commit }, url) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const messages = ( await axios.get(url) ).data;
            if (messages.success) {
                commit("pushChat", messages.data);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },
    },
};
