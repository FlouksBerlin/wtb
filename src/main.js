// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import theme from './assets/style';

import { router } from './router';
import { store } from './store';

Vue.use(Vuetify, { theme });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAQEqInV6w8avNUwVKqK0H_wN5EfaMlrKU',
      authDomain: 'worktoolbox-c5ede.firebaseapp.com',
      databaseURL: 'https://worktoolbox-c5ede.firebaseio.com',
      projectId: 'worktoolbox-c5ede',
      storageBucket: 'worktoolbox-c5ede.appspot.com'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      } else {
        console.log('notwell');
      }
    });
  }
});
