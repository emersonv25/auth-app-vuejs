export default {
    authStatus: '',
    token: localStorage.getItem('token') || '', 
    usuario: JSON.parse(localStorage.getItem('user')) || '',
    
}