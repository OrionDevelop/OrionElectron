import { Account } from '../../models/account';

type State = {
  main: Account[];
};

const state: State = {
  main: []
};

const mutations = {
  ADD_ACCOUNT(state: State, account: Account) {
    state.main.push(account);
  },
  REMOVE_ACCOUNT(state: State, account: Account) {
    state.main.filter((w) => w.id != account.id);
  }
};

const actions = {
  registerAccount({ commit }, account) {
    commit('ADD_ACCOUNT', account);
  }
};

export default {
  state,
  mutations,
  actions
};
