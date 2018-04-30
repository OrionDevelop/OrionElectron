import * as tslib from "tslib";

// Vue related
import axios from "axios";
import Vue from "vue";

// UIKit
import UIKit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// styles
import "uikit/dist/css/uikit.min.css";

// tslint:disable-next-line:no-var-requires
if (!process.env.IS_WEB) { Vue.use(require("vue-electron")); }
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

UIKit.use(Icons);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
