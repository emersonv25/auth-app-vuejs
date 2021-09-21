<template>
    <div>
        BEMVINDO
        {{usuario}}
        
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["usuario"]),
    ...mapGetters(["isLoggedIn"]),
    ...mapGetters(["isAdmin"]),
    //isAdmin : function() {return this.$store.getters.isAdmin}
  },
};
</script>