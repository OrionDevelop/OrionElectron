// global
import * as tslib from "tslib";

import axios from "axios";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import * as moment from "moment";
import Vue from "vue";
import VueShortkey from "vue-shortkey";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "element-ui/lib/theme-default/index.css";

import "./exts";
import "./main.scss";

// tslint:disable:object-literal-sort-keys
moment.updateLocale("en", {
  relativeTime: {
    future: "",
    past: "",
    s: "now",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1 month",
    MM: "%d months",
    y: "1y",
    yy: "%dy"
  }
});
// tslint:enable:object-literal-sort-keys

if (!process.env.IS_WEB) {
  // tslint:disable-next-line:no-var-requires
  Vue.use(require("vue-electron"));
}

Vue.use(VueShortkey);
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
