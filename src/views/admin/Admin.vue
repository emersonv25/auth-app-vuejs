<template>
  <v-card v-if="isAdmin">
    <v-card-title>Gerenciar Usuários </v-card-title>
    <v-data-table
      :headers="headers"
      :items="admin_usuarios"
      :loading="loadingTable"
    >
      <template v-slot:item.id="{ item }">
        <v-icon
          class="mr-2"
          @click="editar(item.username, item.nome, item.cargo, item.email, item.ativo, item.id)"
        >
          mdi-account-edit
        </v-icon>
      </template>
      <template v-slot:item.ativo="{ item }">
        <v-chip
          v-if="item.ativo == 1"
          color="green"
          dark
        >
          Sim
        </v-chip>
        <v-chip
          v-if="item.ativo == 0"
          color="red"
          dark
        >
          Não
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog
      v-model="dialogEditar"
      max-width="480"
      :key="usuarioEditar.usuario"
      persistent
    >
      <v-card class="text-center" :loading="loadingsalvar">
        <v-card-text class="headline font-weight-bold" style="padding-top: 10px"
          >Editar Usuário ID: {{usuarioEditar.id}}
        </v-card-text>
        <v-card-text>
            <v-text-field label="Nome" outlined v-model="usuarioEditar.nome"></v-text-field>
            <v-text-field label="Username" outlined v-model="usuarioEditar.username"></v-text-field>
            <v-select label="Cargo" outlined v-model="usuarioEditar.cargo" :items="['usuario', 'admin']"></v-select>
            <v-text-field label="Email" outlined v-model="usuarioEditar.email"></v-text-field>
            <v-select label="Ativo" outlined v-model="usuarioEditar.ativo" :items="[0,1]"></v-select>
        </v-card-text>
        <v-card-actions>

          <v-btn text color="error" small @click="dialogExcluir = true">
            Exluir Usuário
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            outlined
            color="gray"
            @click="dialogEditar = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            color="success"
            @click="salvar(usuarioEditar)"
          >
            Salvar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog
      v-model="dialogExcluir"
      max-width="480"
      :key="usuarioEditar.id"
    >
      <v-card class="text-center" :loading="loadingExcluir">
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>Tem certeza que deseja deletar permanentemente esté usuário ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            outlined
            color="gray"
            @click="dialogExcluir= false"
          >
            Cancelar
          </v-btn>
            <v-btn text color="error" @click="excluir(usuarioEditar.id)">
              Deletar
            </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      loading: false,
      loadingTable: false,
      dialogEditar: false,
      dialogExcluir: false,
      loadingExcluir: false,
      loadingsalvar: false,
      usuarioEditar: { username: "", nome: "", cargo: '', email: '', ativo: 0, id: '' },
      search: "",
      nome: "",
      headers: [
        { text: "Nome", value: "nome" },
        { text: "Username", value: "username" },
        { text: "Cargo", value: "cargo" },
        { text: "Email", value: "email" },
        { text: "Ativo", value: "ativo" },
        { text: "Ação", value: "id" },
      ],
    };
  },
  methods: {
    async getUsuarios() {
      this.loadingTable = true;
      await this.$store.dispatch("getUsuarios");
      this.loadingTable = false;
    },
    editar(username, nome, cargo, email, ativo, id) {
      this.dialogEditar = true;
      this.usuarioEditar.username = username;
      this.usuarioEditar.ativo = ativo;
      this.usuarioEditar.nome = nome;
      this.usuarioEditar.cargo = cargo;
      this.usuarioEditar.email = email;
      this.usuarioEditar.id = id;
    },
    async excluir(id) {
      this.loadingExcluir = true
      await this.$store.dispatch("deletar", id)
      await this.$store.dispatch("getUsuarios");
      this.loadingExcluir = false
      this.dialogExcluir = false
      this.dialogEditar = false
      
    },
    async salvar(usuario){
      this.loadingsalvar = true;
      try {
        await this.$store.dispatch("editar", usuario)
      } catch (error) {
        console.log(error)
      }
      
      await this.$store.dispatch("getUsuarios");
      this.loadingsalvar = false;
      this.dialogEditar = false;
    }

  },
  computed: {
    ...mapGetters(["isAdmin"]),
    ...mapGetters(["admin_usuario"]),
    ...mapGetters(["admin_usuarios"]),
    ...mapGetters(["admin_msg"]),
  },
  beforeMount() {
    this.getUsuarios();
  },
};
</script>
