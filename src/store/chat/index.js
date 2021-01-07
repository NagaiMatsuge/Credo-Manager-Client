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
        setChatId(state, chat_id) {
            state.chat_id = chat_id;
        },
        // updateChat(state, {data, getters}){
        //     // state.chat = chat;
        //     let pushDataToLocalChat = {
        //         color: getters.getUserCredentials.color,
        //         photo: getters.getUserCredentials.photo,
        //         name: getters.getUserCredentials.name,
        //         user_id: getters.getUserCredentials.id,
        //         content: [
        //             {
        //                 text: data.e.messages
        //             }
        //         ]
        //     }
        //     if (data.e.task_id === data.id){
        //         if (state.chat.data[state.chat.data.length - 1].user_id === getters.getUserCredentials.id){
        //             state.chat.data[state.chat.data.length - 1].content.push({text: data.e.messages})
        //         }else{
        //             state.chat.data.push(pushDataToLocalChat)
        //         }
        //     }
        //     console.log(data)
        //     console.log(getters.getUserCredentials.id)
        // },
        clearChat(state, chat) {
            state.chat = null;
        },
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
                commit("setChatId", id);
                commit("removeProgress");
            } else {
                commit("removeProgress");
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


    },
    getters: {
        chat: (s) => s.chat,
        chat_id: (s) => s.chat_id,
    },
};