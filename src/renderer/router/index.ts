import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// tslint:disable:object-literal-sort-keys
export default new Router({
  routes: [
    {
      name: "landing-page",
      path: "/",
      component: require("@/components/LandingPage").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
