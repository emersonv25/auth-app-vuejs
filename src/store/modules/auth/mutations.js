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
    set_usuario(state, usuario){
      state.usuario = usuario
    }
}