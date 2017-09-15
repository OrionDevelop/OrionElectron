import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    filter: (mutation: any) => {
      // type=ADD_ACCOUNT, payload=Account.instance
      return true;
    }
  })],
  strict: process.env.NODE_ENV !== "production"
});
