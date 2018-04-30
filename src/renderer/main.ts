import * as tslib from "tslib";

import axios from "axios";
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// tslint:disable-next-line:no-var-requires
if (!process.env.IS_WEB) { Vue.use(require("vue-electron")); }
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
