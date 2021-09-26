<template >
        <div class="pa-2" v-if="isLoggedIn" 
          style="
              width: 100px
              display: block;
              margin-left: auto;
              margin-right: auto ">
          <v-btn block @click='logout' color='red'>
            Sair
          </v-btn>
        </div>
</template>


<script>
export default {
    name: 'Logout',
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      async logout () {
        await this.$store.commit('logout')
        await this.$store.commit('remove_msg')
        this.$router.push('/login')
      }
    },
}
</script>