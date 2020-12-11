import axios from "axios";

export default {
    actions: {
        async login({dispatch, commit}, {email, password, remember_me}) {
            const user = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/login`, {email, password, remember_me})).data
            if (user.success){
                localStorage.setItem('token', user.data._token);
            }else {
                commit("setError", user.message)
                commit('clearNotification')
                throw user.message
            }

        },
        async passwordReset({dispatch, commit}, {email}) {
            const forgot = (await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/forgot`, {email})).data
            if (forgot.success){
                commit("setNotification", forgot.message)
                commit('clearNotification')
            }else {
                commit("setError", forgot.message)
                commit('clearNotification')
                throw forgot.message
            }
        },
        async SetNewPassword({dispatch, commit}, {password,token}) {
            try {
               await axios.post(`${process.env.VUE_APP_SERVICE_URL}/password/reset`, {password,token})
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
    },
};