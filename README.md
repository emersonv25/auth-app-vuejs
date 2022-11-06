# auth-app-vuejs

## Visão Geral do Projeto

Um sistema de autenticação com Json Web Token desenvolvido com o Vue, Vuex, Vue-Router, Vuetify e Axios

api: https://github.com/emersonv25/auth-api-dotnet
### OBS: Refatorei a api e este projeto acabou ficando desatualizado

## Screenshots

* Tela de Login
<p align="left">
  <img src="screenshot/Login.png" width="480">
</p>

* Tela de Registro
<p align="left">
  <img src="screenshot/Cadastro.png" width="480">
</p>

* Home
<p align="left">
  <img src="screenshot/Home.png" width="480">
</p>

* Editar Perfil
<p align="left">
  <img src="screenshot/Perfil.png" width="480">
</p>

* Gerenciar Usuários ADMINISTRADOR
<p align="left">
  <img src="screenshot/usuarios.png" width="480">
</p>
<p align="left">
  <img src="screenshot/editaruser.png" width="480">
</p>

## Padrão de Projeto

*  FLUX (vuex)


# Configurações

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



