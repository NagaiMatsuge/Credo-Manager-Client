import axios from "axios";

export default {
    state: {
        mid: null,
    },
    mutations: {
        setMid(state, mid) {
            state.mid = mid;
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
    },
    getters: {
        getMid: (s) => s.mid,
    },
};