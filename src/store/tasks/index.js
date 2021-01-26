import axios from "axios";

export default {
    state: {
        task: null,
        id: null
    },
    mutations: {
        setTask(state, task) {
            state.task = task;
        },
        setTaskId(state, id) {
            state.id = id;
        },
    },

    actions: {
        async tasksAll({ commit }, obj = {project_id: 0,user_id: 0 }) {
            console.log(obj)
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks?project_id=${obj.project_id}&user_id=${obj.user_id}`) ).data;
            // let queryString = "tasks?";
            // if(obj.pro)
            // if (obj.project_id && !obj.user_id){
            //     projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks?project_id=${obj.project_id}`) ).data;
            // }else if  (obj.project_id && obj.user_id) {
            //     projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks?project_id=${obj.project_id}&user_id=${obj.user_id}`) ).data;
            // }else if  (!obj.project_id && obj.user_id){
            //     projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks?user_id=${obj.user_id}`) ).data;
            // }else{
            //     projects = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks`) ).data;
            // }

            if (projects.success) {
                commit("setTask", projects);
            } else {
                commit("removeProgress");
                commit("setError", projects.message);
                commit("clearNotification");
                throw projects.message
            }
        },

        async sendTask({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const task = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/tasks/create`, obj) ).data;
            if (task.success) {
                commit("setTask", task);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", task.message);
                commit("clearNotification");
                throw task.message
            }
        },
        async editTask({ commit }, {obj, id}) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const task = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/tasks/update/${id}`, obj) ).data;
            if (task.success) {
                commit("setTask", task);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", task.message);
                throw task.message
            }
        },
        async editActive({ commit }, {user_id, task_id}) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const task = ( await axios.put(`${process.env.VUE_APP_SERVICE_URL}/tasks/clock`, {user_id: user_id, task_id: task_id}) ).data;
            if (task.success) {
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", task.message);
                throw task.message
            }
        },

    },
    getters: {
        getTasks: (s) => s.task,
        getTaskId: (s) => s.id,
    },
};