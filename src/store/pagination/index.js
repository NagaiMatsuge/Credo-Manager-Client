import axios from "axios";

export default {
    actions: {
        async paginationLink({ commit }, {url, name}) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const projects = ( await axios.get(url) ).data;
            if (projects.success) {
                if (name === 'tasks'){
                    commit("setTask", projects);
                }
                if (name === 'payments'){
                    commit("setPayments", projects);
                }
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", projects.message);
                commit("clearNotification");
                throw projects.message
            }
        },
    },
};
