import axios from "axios";

export default {
    state: {
        chat: null,
        chat_id: null,
    },
    mutations: {
        setChat(state, chat) {
            state.chat = chat;
        },
        pushChat(state, chat) {
            state.chat.data.unshift(...chat);
        },
        setChatId(state, chat_id) {
            state.chat_id = chat_id;
        },
        clearChat(state) {
            state.chat = null;
        },
    },

    actions: {
        async allMessages({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            const messages = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/tasks/${id}/messages`) ).data;
            if (messages.success) {
                commit("setChat", messages);
                commit("setChatId", id);
            } else {
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },
        async userHasReadMessages({ commit, dispatch }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            const messages = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/messages/read`, {task_id: id}) ).data;

            if (messages.success) {
                dispatch('tasksAll')
            } else {
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },
        async sendMessage({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            const messages = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/messages/create`, obj) ).data;
            if (messages.success) {
            } else {
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },
        async toCheck({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            const messages = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/tasks/update/${id}`, {finished: true}) ).data;
            if (messages.success) {
            } else {
                commit("setError", messages.message);
                commit("clearNotification");
                throw messages.message
            }
        },


    },
    getters: {
        chat: (s) => s.chat,
        chat_id: (s) => s.chat_id,
    },
};