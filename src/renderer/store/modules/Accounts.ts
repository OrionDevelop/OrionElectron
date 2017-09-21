import { Authentication } from "../../../common/auth";
import { ITokens } from "../../../common/ITokens";
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";

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
      try {
        const account = new Account(tokens);
        const client = credentials.findOrCreateClient(account);
        account.user = await client.verifyCredentials();
        commit("ADD_ACCOUNT", account);
      } catch (err) {
        // ignored
      }
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
