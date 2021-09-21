import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  //mode: 'history', // descomentar para ativar o modo histórico do navegador (necessário configuração adicional no servidor)
  //base: "web", // rota base, descomentar e editar caso não for a raiz
  routes
})

//Tratamento de casos de acesso não autorizado
router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }
  else if(to.matched.some(record => record.meta.guest)){
    if(!store.getters.isLoggedIn){
      next ()
      return
    }
    next('/')
  }

  else if(to.matched.some(record => record.meta.isAdmin)){
    if(store.getters.isLoggedIn && store.getters.isAdmin){
      next()
      return
    }
    next('/')
  }
  

  
})


export default router
