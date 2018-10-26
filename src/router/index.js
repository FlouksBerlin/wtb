import Vue from 'vue';
import Router from 'vue-router';
import { store } from '../store';
//import AuthGuard from "./auth-guard";

import Home from '@/components/Home';
import Signup from '@/components/User/Signup';
import Signin from '@/components/User/Signin';
import Profile from '@/components/User/Profile';
import Tools from '@/components/Tools';
import WorktimeEntries from '@/components/tools/WorktimeEntries';
import Notes from '@/components/tools/Notes';
import TimeEntries from '@/components/tools/TimeEntries';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/tools',
      component: Tools,
      children: [
        { path: 'notes', component: Notes },
        { path: 'worktime', component: WorktimeEntries },
        { path: 'timeentries', component: TimeEntries }
      ]
    }
  ]
});

//TODO: stop showing 'signIn' page (for a few seconds) when site is reloaded (F5)
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/signin', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.user;

  if (authRequired && !loggedIn) {
    return next('/signin');
  }

  next();
});
