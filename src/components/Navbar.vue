<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile
            v-else
            :key="i"
            
            @click="navigateTo(item.path)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar color="amber" app absolute clipped-left>
    <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
    <router-link to="/" tag="span" class="title ml-3 mr-5" style="cursor: pointer">
      Google&nbsp;<span class="font-weight-light">Keep</span>
    </router-link>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <span class="" style="cursor: pointer">
      {{ userIsAuthenticated }} <span v-if="userIsAuthenticated" @click="signOut"> | {{ user.id.substr(0,5) }} | {{user.username}} </span>
    </span>
  </v-toolbar>
  </div>
</template>


<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: "lightbulb_outline", text: "Notes", path: '/tools/notes' },
      { icon: "access_alarm", text: "Worktime", path: '/tools/worktime' },
      { divider: true },
      { heading: "Labels" },
      { icon: "add", text: "Create new label" },
      { divider: true },
      { icon: "lock_open", text: "Login", path: '/signin' },
      { icon: "mdi-account-plus", text: "Sign Up", path: '/signup' },
      { icon: "mdi-logout", text: "Sign Out", method: 'singOut()' },
      { divider: true },
      { icon: "settings", text: "Settings" },
      { icon: "chat_bubble", text: "Trash" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" },
      { icon: "keyboard", text: "Keyboard shortcuts" }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    navigateTo(path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.push('/');
      }
    },
    signOut(){
      this.$store.dispatch('signOut');
    }
  }
};
</script>
