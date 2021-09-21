import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'
//import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  actions:{
  },

  state: {
    errorMsg: '',
    successMsg: '',
    loading: false
  },

  getters:{
    errorMsg: state => state.errorMsg,
    successMsg: state => state.successMsg,
    isLoading: state => state.loading
  },

  mutations:{
    error_msg(state, error){
      state.loading = false
      state.errorMsg = error
    },
    success_msg(state, msg){
      state.loading = false
      state.successMsg = msg
    },
    loading(state, bool = true){
      state.loading = bool
    },
    remove_msg(state){
      state.loading = false
      state.errorMsg = ''
      state.successMsg = ''
    },
  },

  // Inicia os modulos
  modules:{
    auth,
    admin
  }
})
