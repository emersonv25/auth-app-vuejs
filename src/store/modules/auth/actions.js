import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;

export default{
    login({commit}, payload){
        commit("loading", true)
        return new Promise((resolve, reject) => {
          axios({url: uri+'Auth/login', data: {username: payload.username, password: payload.senha} , method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const usuario = resp.data.usuario
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(usuario))
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', {token, usuario})
            commit("loading", false)
            resolve(resp)
                      
          })
          .catch(err => {
            commit('error_msg', err.response.data.error)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
          })
        })
    },
    logout({commit}){
      delete axios.defaults.headers.common['Authorization']
      commit('logout')
    },
    register({commit}, payload){
      commit("loading", true)
      return new Promise((resolve, reject) =>{
        axios({url: uri + 'Auth/cadastrar', data: {username: payload.username,nome: payload.nome, password: payload.senha, email: payload.email}, method: "POST"})
        .then(resp => {
          commit("success_msg", "Cadastro realizado com successo !")
          resolve(resp)
        }).catch(err => {
          commit('error_msg', err.response.data.error)
          reject(err)
        })
      })
    },
    deletarUsuario({ commit }, id) {
      return new Promise((resolve, reject) => {
          axios({ur: uri+'Auth/deletar?id=' + id, method: 'DELETE' }).then(resp => {
              commit('success_msg', resp.data.message)
              resolve(resp)
          }).catch(err => {   
              commit('error_msg', err.response.data.error)
              reject(err)
          })
      })
  },
  editarUsuario({ commit }, usuario) {
    return new Promise((resolve, reject) => {
        axios({url: uri+'Auth/editar?id=' + usuario.id, data: usuario , method: 'PUT' }).then(resp => {
            commit('success_msg', resp.data.message)
            localStorage.setItem('user', JSON.stringify(usuario))
            resolve(resp)
        }).catch(err => {   
            commit('error_msg', err.response.data.error)
            reject(err)
        })
    })
},
}