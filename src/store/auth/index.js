export default {
    actions: {
        async login({dispatch,commit}, {email,password}) {
            try {
                await auth(email, password)
            } catch (e) {
                // commit('setError', e)
                throw e
            }
        },
    },
}