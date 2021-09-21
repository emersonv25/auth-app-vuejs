export default {
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.authStatus,
    usuario: state => state.usuario,
    isAdmin: state => state.usuario.cargo == "admin" ? true : false

}