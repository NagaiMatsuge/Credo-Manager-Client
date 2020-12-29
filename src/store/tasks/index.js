import axios from "axios";

export default {
    state: {
        task: null
    },
    mutations: {
        setTask(state, task) {
            state.task = task;
        },
    },

    actions: {
        async tasksAll({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks`) ).data;
            if (projects.success) {
                commit("setTask", projects.data);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", projects.message);
                commit("clearNotification");
                throw projects.message
            }
        },
    },
    getters: {
        getTasks: (s) => s.task,
    },
};