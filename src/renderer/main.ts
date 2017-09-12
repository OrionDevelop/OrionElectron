import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'

import './extensions';

const VueExtend: any = Vue;

if (!process.env.IS_WEB) VueExtend.use(require('vue-electron'))
VueExtend.http = VueExtend.prototype.$http = axios
VueExtend.config.productionTip = false

/* eslint-disable no-new */
new VueExtend({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
