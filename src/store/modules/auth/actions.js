import axios from 'axios'
const api = require('@/api.json');
const uri = api.url;

export default{
    login({commit}, {usuario, senha}){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: uri+'Auth/login', data: {username: usuario, password: senha} , method: 'POST' })
          .then(resp => {
            if(resp.data.token != '' && resp.data.token != null){
              const token = resp.data.token
              const usuario = resp.data.usuario
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(usuario))
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              commit('auth_sucess', {token, usuario})
              resolve(resp)
            }
            else{
              commit('auth_error')
              commit('error_msg', "Falha na conexão")
              localStorage.removeItem('token')
              localStorage.removeItem('user')
            }
            
          })
          .catch(err => {
            commit('auth_error')
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
}