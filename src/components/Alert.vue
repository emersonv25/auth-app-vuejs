<template>
  <div>
    <v-alert dense outlined :type="tipo"  dismissible>
      <template v-slot:close>
        <v-btn icon x-small @click="removeMsg"><v-icon> mdi-close </v-icon></v-btn>
      </template>
      {{Msg()}}
    </v-alert>
  </div>

</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: {
    msg: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: false,
      default: "error",
    },
  },
  methods: {
    Msg() {
      if (this.msg == "Token invalido") {
        return "A sessão expirou, relogando em alguns segundos";
      } 
      else {
        return this.msg;
      }
    },
    removeMsg(){this.$store.commit('remove_msg')}
  },
};
</script>