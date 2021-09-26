import axios from 'axios'
const api = require('@/api.json');
const url = api.url;
export default {
    actions: {
        getUsuarios({ commit }) {
            return new Promise((resolve, reject) => {
                axios(url + 'Usuarios').then(resp => {
                    commit('set_usuarios', resp.data)
                    resolve(resp)
                }).catch(err => {
                    commit('error_msg', 'Falha na conexão')
                    reject(err)
                })
            })
        },
        editar({ commit }, usuario) {
            commit("clear_admin_msg")
            return new Promise((resolve, reject) => {
                axios({url: url+'Auth/admin/editar?id=' + usuario.id, data: usuario , method: 'PUT' }).then(resp => {
                    commit('success_msg', resp.data.message)
                    resolve(resp)
                }).catch(err => {   
                    commit('error_msg', err.response.data.error)
                    reject(err)
                })
            })
        },
        deletar({ commit }, id) {
            commit("clear_admin_msg")
            return new Promise((resolve, reject) => {
                axios({url: url+'Auth/admin/deletar?id=' + id, method: 'DELETE' }).then(resp => {
                    commit('success_msg', resp.data.message)
                    resolve(resp)
                }).catch(err => {   
                    commit('error_msg', err.response.data.error)
                    reject(err)
                })
            })
        }

    },
    state: {
        admin_usuarios: [],
        admin_msg: '',

    },
    mutations: {
        set_usuarios(state, usuarios){
            state.admin_usuarios = usuarios
        },
        set_admin_msg(state, msg){
            state.admin_msg = msg
        },
        clear_admin_msg(state){
            state.admin_msg = ''
        }
    },
    getters: {
        admin_usuarios: state => state.admin_usuarios,
        admin_msg: state => state.admin_msg,
    },
}