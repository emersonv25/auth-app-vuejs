# Login-JWT-VueJs

**Visão Geral do Projeto**

Boilerplate de uma tela de autenticação com JWT desenvolvido com Vue, Vuex, Vue-Router e Axios

api: https://github.com/emersonv25/Login-JWT-Api-AspNetCore5

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



