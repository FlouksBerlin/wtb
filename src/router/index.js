import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Tools from "@/components/Tools";
import Worktime from "@/components/tools/Worktime";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    {
      path: "/tools",
      component: Tools,
      children: [{ path: "worktime", component: Worktime }]
    }
  ]
});
