import { Authentication } from "../../../common/auth";
import { ITokens } from "../../../common/ITokens";
import { Account } from "../../models/Account";

interface IState {
  accounts: Account[];
}

const state: IState = {
  accounts: []
};

const mutations = {
  ADD_ACCOUNT(w: IState, account: Account) {
    w.accounts.push(account);
  }
};

const actions = {
  addAccount({ commit }, tokens: ITokens) {
    (async () => {
      const account = new Account(tokens);
      await account.fetch();
      commit("ADD_ACCOUNT", account);
    })();
  }
};

const getters = {
  accounts: (w: IState) => {
    return w.accounts.slice().sort((a, b) => a.order - b.order);
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
