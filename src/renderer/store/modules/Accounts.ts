import { Account } from "../../models/account";

interface IState {
  main: Account[];
}

const state: IState = {
  main: []
};

const mutations = {
  ADD_ACCOUNT(s: IState, account: Account) {
    s.main.push(account);
  },
  REMOVE_ACCOUNT(s: IState, account: Account) {
    s.main.filter((w) => w.id !== account.id);
  }
};

const actions = {
  registerAccount({ commit }, account) {
    commit("ADD_ACCOUNT", account);
  }
};

export default {
  actions,
  mutations,
  state,
};
