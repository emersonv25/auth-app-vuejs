<template>
  <v-app>   
    <Navbar/>
    <v-main>
      <v-container>
        <Alert :msg="errorMsg" :tipo="'error'" v-show="errorMsg != ''" v-if="this.$route.name != 'Login'"></Alert>
        <Alert :msg="successMsg" :tipo="'success'" v-show="successMsg != ''"></Alert>
        <v-progress-linear indeterminate color="primary" v-if="isLoading == true"></v-progress-linear>
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>       
      </v-container>     
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Alert,
  },

  beforeCreate() {
    //this.$store.dispatch('autenticar').then(() => this.$router.push('/'))  

  },
  methods:{
  },
  computed:{
    ...mapGetters(['errorMsg']),
    ...mapGetters(['successMsg']),
    ...mapGetters(['isLoading']),
  },
  //Tratamento de casos de token expirados
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if ( err.response.status == 401 /*|| err.response.status == 400 || err.response.status === 404 || err.response.status == 404 && err.response.config && !err.response.config.__isRetryRequest*/) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          delete axios.defaults.headers.common['Authorization']
          location.reload();
          //setTimeout(function(){ location.reload(); }, 5000);
        }
        throw err;
      });
    });
  }
}
</script>