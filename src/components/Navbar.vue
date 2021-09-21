<template>
  <div>
    <v-app-bar app height="70">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <Dark style="margin-top: 15px" />
      <v-divider vertical></v-divider>
      <div class="d-flex" style="text-align: end">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="primary--text">
              <h2 class="font-weight-medium text-left">Login</h2>
              <v-list-item-subtitle>
                Versão: {{versao}}
              </v-list-item-subtitle>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-app-bar>
    <!-- SideBar !-->
    <v-navigation-drawer
      dark
      v-model="drawer"
      bottom
      app
      width="225"
      height="100%"
      v-if="isLoggedIn"
    >
      <v-card height="100%">
        
        <v-list-item>
          <v-list-item-content>
            <!--
            <v-img
              alt="Logo"
              class="shrink mr-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              height="50"/>!-->    
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item three-line>
          <v-list-item-content>
            <v-avatar>
              <v-icon size="50px"
                >mdi-account-circle</v-icon
              >
            </v-avatar>

            <v-list-item-title class="text-center">{{
              usuario.username
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-center">{{
              usuario.nome
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <Logout />
        <v-divider></v-divider>
        <v-list v-if="isAdmin">
          <v-subheader>Administrador</v-subheader>
          <v-list-item-group v-for="(item, i) in itemsAdm" :key="i">
            <v-list-item :to="item.rota">
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-content style="margin-left: 15px">
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Logout from "@/components/Logout.vue";
import Dark from "@/components/Dark.vue";
import {version} from '../../package'
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    Logout,
    Dark,
  },
  data() {
    return {
      right: null,
      drawer: true,
      versao: version,
      itemsAdm: [
        {
          title: "Gerenciar Usuários",
          icon: "mdi-shield-lock-outline",
          rota: "/admin",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["usuario"]),
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["isAdmin"]),
    //isAdmin : function() {return this.$store.getters.isAdmin}
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
