import Home from "./components/Home.vue";
import Tools from "./components/Tools.vue";
import Worktime from "./components/tools/Worktime.vue";

export const routes = [
  { path: "/", component: Home },
  {
    path: "/tools",
    component: Tools,
    children: [{ path: "worktime", component: Worktime }]
  }
];
