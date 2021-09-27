<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <div class="text-center">
        <v-avatar color="dark">
          <v-icon x-large>
            mdi-account-circle
          </v-icon>
        </v-avatar>        
      </div>
      <v-card-title class="justify-center">Bem Vindo, {{usuario.nome}}</v-card-title>
    </v-col>
    <v-col>
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
      >
        <v-list-item three-line to="/perfil">
          <v-list-item-content>
            <v-list-item-title class="text-h5"> 
              Meu Perfil
            </v-list-item-title>
            <v-list-item-subtitle>Edite as informações da sua conta</v-list-item-subtitle>
          </v-list-item-content>
          <v-icon x-large>mdi-card-account-details</v-icon>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col v-if="isAdmin">
      <v-card       
        class="mx-auto"
        max-width="344"
        outlined>
        <v-list-item three-line to="/admin">
          <v-list-item-content>
            <v-list-item-title class="text-h5"> 
              Gerenciar Usuários
            </v-list-item-title>
            <v-list-item-subtitle>Gerencie os usuários cadastrados no sistema</v-list-item-subtitle>
          </v-list-item-content>
          <v-icon x-large>mdi-shield-lock-outline</v-icon>
        </v-list-item>      
      </v-card>
    </v-col>
  </v-row>
</v-container>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapGetters(["usuario"]),
  },
};
</script>