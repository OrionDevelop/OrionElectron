import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    filter: (mutation: { type: string, payload: any }) => {
      // type=ADD_ACCOUNT, payload=Account.instance
      switch (mutation.type) {
        case "RESTORE_CREDENTIAL":
          return false;
        default:
          return true;
      }
    }
  })],
  strict: process.env.NODE_ENV !== "production"
});
