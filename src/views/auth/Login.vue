<template>
  <v-card
    class="mx-auto my-12"
    max-width="360"
    :loading="isLoading"
    style="margin-top: 150px !important"
  >
    <v-container>
      <v-row style="margin: 5%">
        <v-flex style="display: flex; justify-content: center">
          <v-img max-width="50%" src="@/assets/logo.png"></v-img>
        </v-flex>
      </v-row>
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
              Autenticando... Por favor, aguarde !
            </v-alert>
          </div>
        </v-col>
      </v-row>
      <v-row style="margin: 5%" v-if="!isLoading">
        <v-col>
          <v-form
            ref="formLogin"
            class="login"
            @submit.prevent="login"
            v-model="formValid"
          >
            <v-text-field
              v-model="username"
              id="username"
              name="usuario"
              label="Nome de Usuário"
              prepend-icon="mdi-account"
              :rules="rules.usuario"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="senha"
              id="senha"
              label="Senha"
              name="senha"
              prepend-icon="mdi-lock"
              type="password"
              :rules="rules.senha"
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
            <v-card-actions>
              <v-btn color="primary" text to="/register">
                Criar conta
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" large type="submit">
                Entrar
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
  name: "Login",
  data() {
    return {
      username: "",
      senha: "",
      formValid: false,
      rules: {
        usuario: [(value) => !!value || "Digite seu usuário."],
        senha: [(value) => !!value || "Digite sua senha."],
      },
    };
  },
  computed: {
    ...mapGetters(['errorMsg']),
    ...mapGetters(['successMsg']),
    ...mapGetters(['isLoading']),
  },
  methods: {
    login: function () {
      if (this.formValid) {
        this.$store.commit("remove_msg");
        let username = this.username;
        let senha = this.senha;
        this.$store
          .dispatch("login", { username, senha })
          .then(() => this.$router.push("/"))
          .catch(this.senha = "");
      } else {
        this.$refs.formLogin.validate();
      }
    },
  },
  beforeMount() {
    //this.$store.dispatch('autenticar').then(() => this.$router.push('/'))  
  },
};
</script>