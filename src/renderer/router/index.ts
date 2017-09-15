import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      component: require("@/components/Home"),
      name: "home",
      path: "/",
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
