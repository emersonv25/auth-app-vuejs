import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;

export default{
    login({commit}, payload){
        commit("loading", true)
        return new Promise((resolve, reject) => {
          axios({url: uri+'Auth/login', data: {username: payload.usuario, password: payload.senha} , method: 'POST' })
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
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
    },
    register({commit}, payload){
      commit("loading", true)
      return new Promise((resolve, reject) =>{
        axios.post(uri + 'Auth/cadastrar', {username: payload.usuario,nome: payload.nome, password: payload.senha, email: payload.email})
        .then(resp => {
          commit("success_msg", "Cadastro realizado com successo !")
          resolve(resp)
        }).catch(err => {
          commit('error_msg', err.response.data.error)
          reject(err)
        })
      })
    }
}