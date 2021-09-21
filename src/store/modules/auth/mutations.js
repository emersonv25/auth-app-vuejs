export default {
  auth_request(state) {
      state.authStatus = 'loading'
    },
    auth_sucess(state, {token, usuario}){
      state.authStatus = 'sucess'
      state.token = token
      state.usuario = usuario
    },
    logout(state){
      state.authStatus = ''
      state.usuario = {}
      state.token = ''
    },
    auth_error(state){
      state.authStatus = 'error'
    }
}