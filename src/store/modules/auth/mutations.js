export default {
    auth_success(state, {token, usuario}){
      state.token = token
      state.usuario = usuario
    },
    logout(state){
      state.authStatus = ''
      state.usuario = {}
      state.token = ''
    },
}