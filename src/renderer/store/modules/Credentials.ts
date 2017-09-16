import { Credential } from "../../models/credential";

interface IState {
  main: Credential[];
}

const state: IState = {
  main: []
};

const mutations = {
  ADD_CREDENTIAL(s: IState, credential: Credential) {
    s.main.push(credential);
  },
  REMOVE_CREDENTIAL(s: IState, credential: Credential) {
    s.main.filter((w) => w.id !== credential.id);
  }
};

const actions = {
  registerCredential({ commit }, credential) {
    commit("ADD_CREDENTIAL", credential);
  }
};

export default {
  actions,
  mutations,
  state,
};
