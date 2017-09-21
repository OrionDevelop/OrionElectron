import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";

interface IState {
  statuses: any[];
  subscribers: any[];
}

const state: IState = {
  statuses: [],
  subscribers: []
};

const mutations = {
  SUBSCRIBE_TIMELINE(w: IState, subscriber: Account) {
    w.subscribers.push(subscriber);
  },
  UNSUBSCRIBE_TIMELINE(w: IState, subscriber: Account) {
    w.subscribers = w.subscribers.filter((v) => v.uuid !== subscriber.uuid);
  },
  ADD_STATUS(w: IState, status: any) {
    w.statuses.push(status);
  },
  DELETE_STATUS(w: IState, status: any) {
    w.statuses = w.statuses.filter((v) => v.id !== status.id);
  }
};

const actions = {
  // tslint:disable-next-line:no-shadowed-variable
  subscribeTimeline({ commit, state }: { commit: any, state: IState }, account: Account) {
    if (state.subscribers.filter((w) => w.uuid === account.uuid).length > 0) {
      return;
    }
    commit("SUBSCRIBE_TIMELINE", account);
    const client = credentials.findOrCreateClient(account);
    client.userStream((event) => {
      commit("ADD_STATUS", event);
    });
  }
};

const getters = {
  statuses: (w: IState) => {
    return [...w.statuses].sort((a, b) => a.id - b.id);
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
