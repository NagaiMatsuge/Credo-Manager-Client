import axios from "axios";

export default {
    actions: {
        async paginationLink({ commit },url) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const projects = ( await axios.get(url) ).data;
            if (projects.success) {
                commit("setPayments", projects);
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
