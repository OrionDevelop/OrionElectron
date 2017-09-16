import { Account } from "../../models/account";
import { Credential } from "../../models/credential";

interface IState {
  main: Account[];
  errors: string[];
}

const state: IState = {
  errors: [],
  main: []
};

const mutations = {
  RESTORE_CREDENTIAL(s: IState, account: Account) {
    s.main.push(account);
  },
  HANDLE_RESTORE_EXCEPTIONS(s: IState, error: string) {
    s.errors.push(error);
  },
  CLEAR_RESTORE_ERRORS(s: IState) {
    s.errors.splice(0, s.errors.length);
  }
};

const actions = {
  restoreCredential({ commit }, credential: Credential) {
    (async () => {
      const account = await Credential.restore(credential);
      commit("RESTORE_CREDENTIAL", account);
    })().catch((error) => {
      commit("HANDLE_RESTORE_EXCEPTIONS", `${error}`);
    });
  },
  clearRestoreErrors({ commit }) {
    commit("CLEAR_RESTORE_ERRORS");
  }
};

export default {
  actions,
  mutations,
  state
};
