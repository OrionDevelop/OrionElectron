// global
import * as tslib from "tslib";

import axios from "axios";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-ui/lib/theme-default/index.css";

import "./exts";
import "./main.scss";

if (!process.env.IS_WEB) {
  // tslint:disable-next-line:no-var-requires
  Vue.use(require("vue-electron"));
}

Vue.use(ElementUI, { locale });
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
