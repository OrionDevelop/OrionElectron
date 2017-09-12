type State = {
  main: number;
}

const state: State = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER(state: State) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER(state: State) {
    state.main++
  }
}

const actions = {
  someAsyncTask({ commit }: { commit: any }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
