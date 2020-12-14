import axios from "axios";

export default {
    actions: {
        async login({dispatch, commit}, {email, password, remember_me}) {
            commit('setProgress', 'start')
            const user = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/login`, {email, password, remember_me})).data
            if (user.success){
                localStorage.clear();
                localStorage.setItem('token', user.data._token);
                commit('removeProgress')
            }else {
                commit('removeProgress')
                commit("setError", user.message)
                commit('clearNotification')
                throw user.message
            }


        },
        async logout({dispatch, commit}) {
            commit('setProgress', 'start')
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

            const user = (await axios.post( `${process.env.VUE_APP_SERVICE_URL}/logout`)).data
            if (user.success){
                localStorage.clear();
                commit('removeProgress')
            }else {
                commit('removeProgress')
                commit("setError", user.message)
                commit('clearNotification')
                throw user.message
            }

        },
        async passwordReset({dispatch, commit}, {email}) {
            commit('setProgress', 'start')
            const forgot = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/forgot`, {email})).data
            if (forgot.success){
                commit('removeProgress')
                commit("setNotification", forgot.message)
                commit('clearNotification')
            }else {
                commit('removeProgress')
                commit("setError", forgot.message)
                commit('clearNotification')
                throw forgot.message
            }
            commit('setProgress', 'done')
        },
        async SetNewPassword({dispatch, commit}, {password,token}) {
            commit('setProgress', 'start')
            const newPassword = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/reset`, {password,token})).data
            if (newPassword.success){
                commit('removeProgress')
            }else {
                commit('removeProgress')
                commit("setError", newPassword.message)
                commit('clearNotification')
                throw newPassword.message
            }
        },
    },
};