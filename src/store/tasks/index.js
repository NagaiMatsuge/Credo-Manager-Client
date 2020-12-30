import axios from "axios";

export default {
    state: {
        task: null,
        addTaskInfo: null,
    },
    mutations: {
        setTask(state, task) {
            state.task = task;
        },
        setAddTaskInfo(state, addTaskInfo) {
            state.addTaskInfo = addTaskInfo;
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
                commit("setTask", projects);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", projects.message);
                commit("clearNotification");
                throw projects.message
            }
        },
        async AddTaskInfo({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks`) ).data;
            if (projects.success) {
                commit("setAddTaskInfo", projects);
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
        getAddTaskInfo: (s) => s.task,
    },
};