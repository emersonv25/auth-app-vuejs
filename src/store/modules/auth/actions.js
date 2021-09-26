import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;

export default{
    login({commit}, {usuario, senha}){
        commit("loading", true)
        return new Promise((resolve, reject) => {
          axios({url: uri+'Auth/login', data: {username: usuario, password: senha} , method: 'POST' })
          .then(resp => {
            if(resp.data.token != '' && resp.data.token != null){
              const token = resp.data.token
              const usuario = resp.data.usuario
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(usuario))
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              commit('auth_success', {token, usuario})
              commit("loading", false)
              resolve(resp)
            }
            else{
              commit('error_msg', "Falha na conexão")
              localStorage.removeItem('token')
              localStorage.removeItem('user')
            }
            
          })
          .catch(err => {
            commit('error_msg', err.response.data.error)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            reject(err)
          })
        })
    },
    logout({commit}, usuario){
      return new Promise((resolve, reject) => {
        axios.post(uri + 'logout/', usuario).then(resp =>{
          commit('logout')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          delete axios.defaults.headers.common['Authorization']
          resolve(resp)
        }).catch(err => {
          commit('logout')
          commit('error_msg', 'Falha na conexão')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          delete axios.defaults.headers.common['Authorization']
          reject(err)
        })
      })
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