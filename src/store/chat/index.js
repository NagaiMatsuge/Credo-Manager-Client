import axios from "axios";

export default {
    state: {
        chat: null,
    },
    mutations: {
        setChat(state, chat) {
            state.chat = chat;
        },
        // setAddTaskInfo(state, addTaskInfo) {
        //     state.addTaskInfo = addTaskInfo;
        // },
    },

    actions: {
        async allMessages({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            commit("setProgress", "start");
            const messages = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks/${id}/messages`) ).data;
            if (messages.success) {
                commit("setChat", messages);
                commit("removeProgress");
            } else {
                commit("removeProgress");
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },

    },
    getters: {
        chat: (s) => s.chat,
    },
};