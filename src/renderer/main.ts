// global
import * as tslib from 'tslib';

import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'

import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-default/index.css'

import './main.scss'
import './exts'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(ElementUI, { locale });
// Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')