<<<<<<< HEAD
# JWT-Auth-Front-VueJs

**Visão Geral do Projeto**

Boilerplate de uma tela de autenticação com JWT desenvolvido com Vue, Vuex, Vue-Router e Axios

### Padrão de Projeto

*  FLUX (vuex)


# Configurando Ambiente de Desenvolvimento e Compilando para produção

## Pre-Requisito: 

**Node.Js**

## Instalar as dependências utilizando o comando 

```
npm install
```

### Iniciar o servidor de desenvolvimento
```
npm run serve
```

### Compilar para produção
```
npm run build
```
**Será gerado uma pasta chamada 'dist' com a versão compilada**

### Lints e reparo dos arquivos
```
npm run lint
```

### Configurações customizadas disponivel em:
[Configuration Reference](https://cli.vuejs.org/config/).


# Configurando url da api do back-end
Editar a url das apis dentro do arquivo
> src/api.json 

```
{

  "url" : "http://localhost:5001/api/"

}

```
# Configurando a url base da aplicação
É necessário configurar a url base em dois arquivos:

> vue.config.js
```
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/' // Rota base em produção ex: '/sistema/web/'
  : '/', // Rota base em desenvolvimento
  transpileDependencies: [
    'vuetify'
  ]
}

```
> src/router/index.js
```
const router = new VueRouter({
  //mode: 'history', // descomentar para ativar o modo histórico do navegador (necessário configuração adicional no servidor)
  //base: "portal", // rota base, descomentar e editar caso não for a raiz
  routes
})
```


=======
# Login-JWT-VueJs
Boilerplate de uma tela de autenticação com JWT desenvolvido com Vue, Vuex, Vue-Router e se comunicando com uma webapi via Axios
>>>>>>> 7b4f0fd015781b9b514a3ab612c63835c3f8adb5
