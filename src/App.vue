<template>
    <v-app id="keep app">
      <navbar></navbar>
      <v-content>
        <v-container fluid class="grey lighten-4">
          <router-view></router-view>
        </v-container>
      </v-content>      
    </v-app>  
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin-top: 40px;
}
</style>
