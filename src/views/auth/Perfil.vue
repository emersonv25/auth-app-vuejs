<template>
  <v-card
    class="mx-auto my-12"
    max-width="480"
    :loading="loading"
    style="margin-top: 50px !important"
  >
    <v-container>
    <v-row><v-card-title >Alterar informações da minha conta</v-card-title></v-row>
      <v-row v-if="loading">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <v-alert
              icon="mdi-shield-lock-outline"
              prominent
              text
              type="info"
              style="margin-top: 20px"
            >
              Salvando... Por favor, aguarde !
            </v-alert>
          </div>
        </v-col>
      </v-row>
      <v-row style="margin: 5%" v-if="!loading">
        <v-col>
          <v-form
            ref="formPerfil"
            class="Perfil"
            @submit.prevent="salvar"
            v-model="formValid"
          >
            <v-text-field
              v-model="perfil.nome"
              id="nome"
              label="Nome Completo"
              :rules="rules.nome"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="perfil.username"
              id="username"
              label="Nome de Usuário"
              :rules="rules.usuario"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="perfil.email"
              id="email"
              label="E-mail"
              :rules="rules.email"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="perfil.password"
              id="senha"
              label="Nova Senha"
              type="password"
              :rules="rules.senha"
              required
              outlined
              dense
              :disabled="!alterarSenha"
            ></v-text-field>
            <v-text-field
              v-model="perfil.confirmarSenha"
              id="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              :rules="rules.confirmar"
              required
              outlined
              dense
              :disabled="!alterarSenha"
            ></v-text-field>
            <v-btn text color="primary" @click="alterarSenha = !alterarSenha">Alterar Senha </v-btn>
            <v-spacer></v-spacer>
            <v-card-actions >
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Perfil",
  data() {
    return {
        perfil: {id: '', nome: '', username: '', email: '', password: '', confirmarSenha: ''},
        formValid: false,
        alterarSenha: false,
        loading: false,
        rules: {
            nome: [(value) => !!value || "Digite seu nome completo."],
            usuario: [(value) => !!value || "Digite um nome de usuário.", v => ((v && v.length >= 5) || "Seu nome de usuário deve ter mais de 5 caracteres")],
            senha: [(value) => !!value || "Digite uma senha.", v => ((v && v.length >= 5) || "Use 5 caracteres ou mais para sua senha")],      
            confirmar: [(value) => !!value || "Digite novamente sua senha.", v => (v === this.perfil.password) || "As senhas não são iguais. Tente novamente"],
            email: [
                v => !!v || 'Digite seu E-mail',
                v => /.+@.+/.test(v) || 'E-mail inválido',
            ],
        },
    };
  },
  computed: {
    ...mapGetters(['usuario'])
  },
  methods: {
    async salvar(){
      this.loading = true;
      let usuario = this.perfil
      try {
        await this.$store.dispatch("editarUsuario", usuario)
        this.loading = false;
        this.perfil.password = ""
        this.perfil.confirmarSenha = ""
        this.alterarSenha = false
        this.$store.commit("set_usuario", usuario)
      } catch (error) {
        console.log(error)
        this.loading = false;
      }
    },
  },
  beforeMount() {
    this.perfil = Object.assign({}, this.usuario)
  },
};
</script>