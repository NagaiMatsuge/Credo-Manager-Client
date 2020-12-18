import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        error: null,
        notification: null,

    },
    mutations: {
        setError(state, error){
            state.error = error
        },
        setNotification(state, notification){
            state.notification = notification
        },
        clearNotification(state){
            setTimeout(function (){
                state.error = null
                state.notification = null
            }, 3000)
        },
    },
    getters: {
        error: s => s.error,
        notification: s => s.notification,

    },
}
