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
        cadastrar({ commit }, usuario) {
            commit("clear_admin_msg")
            return new Promise((resolve, reject) => {
                axios.post(url + 'Acesso/Cadastrar?usuario=' + usuario).then(resp => {
                    if(resp.data.msg == 'Solicitação realizada com sucesso!'){
                        commit('success_msg', resp.data.msg)
                        commit('clear_usuario')
                    }
                    else{
                        commit('set_admin_msg', resp.data.msg)
                    }
                    resolve(resp)
                }).catch(err => {   
                    commit('error_msg', 'Falha na conexão')
                    reject(err)
                })
            })
        },
        atualizar({ commit }, usuario) {
            commit("clear_admin_msg")
            return new Promise((resolve, reject) => {
                axios({url: url+'Usuarios/' + usuario.id, data: usuario , method: 'PUT' }).then(resp => {
                    commit('success_msg', resp.data.msg)
                    resolve(resp)
                }).catch(err => {   
                    commit('error_msg', 'Falha na conexão')
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