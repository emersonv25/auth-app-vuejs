module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/' // rota base em produção ex: '/sistema/login/'
  : '/', // rota base em desenvolvimento 
  transpileDependencies: [
    'vuetify'
  ]
}
