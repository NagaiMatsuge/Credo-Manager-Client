import axios from "axios";

export default {
    state: {
        info: null,
        info_project: null
    },
    mutations: {
        setInfoProject(state, info) {
            state.info = info;
        },
        setProjectInfo(state, info_project) {
            state.info_project = info_project;
        },
    },
    actions: {
        async fetchInfoProject({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const project = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/create`))
                .data;
            commit("removeProgress");

            if (project.success) {
                commit("setInfoProject", project.data);
            } else {
                commit("setError", project.message);
                throw project.message
            }
        },
        async fetchProjectInfo({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const project = (await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/${id}/steps`))
                .data;
            commit("removeProgress");

            if (project.success) {
                commit("setProjectInfo", project.data);
            } else {
                commit("setError", project.message);
                throw project.message
            }
        },

    },
    getters: {
        getInfoProject: (s) => s.info,
        getProjectInfo: (s) => s.info_project
    },
};
