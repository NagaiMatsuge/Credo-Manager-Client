import axios from "axios";

export default {
    state: {
        servers: null,
        serverAdd: {
            server:{
                title: '',
                host: '',
                project_id: null,
                type:[
                    {
                      id: 1,
                      title: 'Наш сервер'
                    },
                    {
                        id: 2,
                        title: 'Клиентский сервер'
                    }
                ],
                type_id: null
            },
            ftp_access: {
                port: '',
                host: '',
                login: '',
                password: '',
                description: '',
            },
            db_access: {
                host: '',
                db_name: '',
                login: '',
                password: '',
                description: '',
            }
        },
        serverEdit: null,
    },
    mutations: {
        setServer(state, servers) {
             for (let server of servers){
                 for(let el of server.db_ftp){
                     el.active = false
                 }
                 server.db_ftp[0].active = true
             }
            state.servers = servers;
        },
        setServerEdit(state, serverEdit) {
            state.serverEdit = serverEdit;
        },
        clearServer(state) {
            state.serverEdit = null;
        }
    },

    actions: {
        async serverAll({ commit }, project_id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let server = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/projects/${project_id}/server`) ).data;


            if (server.success) {
                commit("setServer", server.data);
            } else {
                commit("removeProgress");
                commit("setError", server.message);
                commit("clearNotification");
                throw server.message
            }
        },

        async createServer({ commit }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let server = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/servers/create`, obj) ).data;
            if (server.success) {
                commit("setServer", server.data);
            } else {
                commit("removeProgress");
                commit("setError", server.message);
                commit("clearNotification");
                throw server.message
            }
        },
        async deleteServer({ commit, dispatch }, id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let server = ( await axios.delete(`${process.env.VUE_APP_SERVICE_URL}/servers/delete/${id}`) ).data;
            if (server.success) {
            } else {
                commit("removeProgress");
                commit("setError", server.message);
                commit("clearNotification");
                throw server.message
            }
        },
        async getEditServer({ commit, dispatch }, server_id) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let server = ( await axios.get(`${process.env.VUE_APP_SERVICE_URL}/servers/${server_id}`) ).data;
            if (server.success) {
                commit('setServerEdit', server.data)
            } else {
                commit("removeProgress");
                commit("setError", server.message);
                commit("clearNotification");
                throw server.message
            }
        },
        async updateServer({ commit, dispatch }, obj) {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.token}`;
            let server = ( await axios.post(`${process.env.VUE_APP_SERVICE_URL}/servers/update/${obj.server.id}`, obj) ).data;
            if (server.success) {
            } else {
                commit("removeProgress");
                commit("setError", server.message);
                commit("clearNotification");
                throw server.message
            }
        },



    },
    getters: {
        getServer: (s) => s.servers,
        getServerAdd: (s) => s.serverAdd,
        getEditServer: (s) => s.serverEdit,
    },
};