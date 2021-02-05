import axios from "axios";

export default {
    state: {
        mid: null,
        right: null,
        not: null
    },
    mutations: {
        setMid(state, mid) {
            state.mid = mid;
        },
        setRight(state, right) {
            state.right = right;

        },
        setNot(state, not) {
            if (not.notifications){
                for (const notKey of not.notifications.data) {
                    let today = new Date()
                    let diff = Math.floor((Date.parse(notKey.publish_date) - Date.parse(today)) / 86400000);
                    notKey.published = false
                    if (diff < 0) {
                        notKey.published = true
                    }
                }
                state.not = not;
            }

        },
    },

    actions: {
        async getMidUser({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let mid = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/main/mid`) ).data;
            if (mid.success) {
                commit("setMid", mid.data);
            } else {
                commit("removeProgress");
                commit("setError", mid.message);
                throw mid.message
            }

        },
        async getRightUser({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let right = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/main/last`) ).data;
            if (right.success) {
                commit("setRight", right.data);
            } else {
                commit("removeProgress");
                commit("setError", right.message);
                throw right.message
            }
        },
        async getNotesUser({ commit }) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/notifications`) ).data;
            if (not.success) {
                commit("setNot", not.data);
            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async createNotes({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/notes/create`, obj) ).data;
            if (not.success) {

            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async createNotifications({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/notifications/create`, obj) ).data;
            if (not.success) {

            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async updateNotes({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/notes/update/${obj.id}`, obj) ).data;
            if (not.success) {
            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async updateNotifications({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/notifications/update/${obj.id}`, obj) ).data;
            if (not.success) {
            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async deleteNotes({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/notes/delete/${id}`) ).data;
            if (not.success) {
            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
        async deleteNotifications({ commit }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let not = ( await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/notifications/delete/${id}`) ).data;
            if (not.success) {
            } else {
                commit("removeProgress");
                commit("setError", not.message);
                throw not.message
            }
        },
    },
    getters: {
        getMid: (s) => s.mid,
        getRight: (s) => s.right,
        getNote: (s) => s.not,
    },
};