<template>
  <v-card
    class="mx-auto my-12"
    max-width="480"
    :loading="isLoading"
    style="margin-top: 150px !important"
  >
    <v-container>
    <v-row style="margin-left: 5%; margin-top: 5%"><v-card-title >Criar sua Conta</v-card-title></v-row>
      <v-row v-if="isLoading">
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
              Cadastrando sua conta... Por favor, aguarde !
            </v-alert>
          </div>
        </v-col>
      </v-row>
      <v-row style="margin: 5%" v-if="!isLoading">
        <v-col>
          <v-form
            ref="formRegister"
            class="Register"
            @submit.prevent="register"
            v-model="formValid"
          >
            <v-text-field
              v-model="nome"
              id="nome"
              label="Nome Completo"
              :rules="rules.nome"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="username"
              id="username"
              label="Nome de Usuário"
              :rules="rules.usuario"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="email"
              id="email"
              label="E-mail"
              :rules="rules.email"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="senha"
              id="senha"
              label="Senha"
              type="password"
              :rules="rules.senha"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="confirmarSenha"
              id="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              :rules="rules.confirmar"
              required
              outlined
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-alert v-if="errorMsg != ''" dense outlined type="error">
              <div>
                {{ errorMsg }}
              </div>
            </v-alert>
            <v-card-actions >
              <v-btn color="primary" text small @click="toLogin">
                Faça login em vez disso
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit">
                Cadastrar
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
  name: "Register",
  data() {
    return {
        nome:"",
        username: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        formValid: false,
        rules: {
            nome: [(value) => !!value || "Digite seu nome completo."],
            usuario: [(value) => !!value || "Digite um nome de usuário.", v => ((v && v.length >= 5) || "Seu nome de usuário deve ter mais de 5 caracteres")],
            senha: [(value) => !!value || "Digite uma senha.", v => ((v && v.length >= 5) || "Use 5 caracteres ou mais para sua senha")],      
            confirmar: [(value) => !!value || "Digite novamente sua senha.", v => (v === this.senha) || "As senhas não são iguais. Tente novamente"],
            email: [
                v => !!v || 'Digite seu E-mail',
                v => /.+@.+/.test(v) || 'E-mail inválido',
            ],
        },
    };
  },
  computed: {
    ...mapGetters(['errorMsg']),
    ...mapGetters(['successMsg']),
    ...mapGetters(['isLoading']),
  },
  methods: {
    async register () {
      if (this.formValid) {
        this.$store.commit("remove_msg");
        let nome = this.nome;
        let email = this.email;
        let username = this.username;
        let senha = this.senha;
        await this.$store
            .dispatch("register", { nome, username, email, senha })
            .then(() => this.$router.push("/login"))
      } else {
        this.$refs.formRegister.validate();
      }
    },
    toLogin(){
        this.$store.commit("remove_msg");
        this.$router.push("/login")
    }
  },
  beforeMount() {
    //this.$store.dispatch('autenticar').then(() => this.$router.push('/'))  
  },
};
</script>