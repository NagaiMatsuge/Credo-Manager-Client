import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        progress: ""
    },
    mutations: {
        setProgress(state, progress){
            state.progress = progress
        },
        removeProgress(state){
            state.progress = ""
        },
    },
    getters: {
        getProgress: s => s.progress,
    },
}
