import axios from 'axios'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import Vue from 'vue'

import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import './exts';

const VueExtend: any = Vue;

if (!process.env.IS_WEB) VueExtend.use(require('vue-electron'))
VueExtend.use(ElementUI, { locale });

VueExtend.http = VueExtend.prototype.$http = axios
VueExtend.config.productionTip = false

/* eslint-disable no-new */
new VueExtend({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
