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
import axios from 'axios'
export default {
    name: 'Logout',
    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      async logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        await this.$store.commit('logout')
        await delete axios.defaults.headers.common['Authorization']
        this.$router.push('/login')
      }
    },
}
</script>