interface IState {
  main: number;
}

const state: IState = {
  main: 0
};

const mutations = {
  DECREMENT_MAIN_COUNTER(w: IState) {
    w.main--;
  },
  INCREMENT_MAIN_COUNTER(w: IState) {
    w.main++;
  }
};

const actions = {
  someAsyncTask({ commit }: { commit: any }) {
    // do something async
    commit("INCREMENT_MAIN_COUNTER");
  }
};

export default {
  actions,
  mutations,
  state,
};
