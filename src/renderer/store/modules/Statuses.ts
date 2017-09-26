import { IStatus } from "../../../common/twitter";
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";

interface IState {
  blocks: string[];
  friends: string[];
  mutes: string[];
  statuses: IStatus[];
  subscribers: any[];
}

function exists(statuses: IStatus[], status: IStatus): boolean {
  if (statuses.filter((w) => w.id_str === status.id_str).length > 0) {
    return true;
  }
  if (status.retweeted_status) {
    if (statuses.filter((w) => w.id_str === status.retweeted_status.id_str).length > 0) {
      return true;
    }
    return statuses.filter((w) => {
      if (w.retweeted_status) {
        return w.retweeted_status.id_str === status.retweeted_status.id_str;
      } else {
        return false;
      }
    }).length > 0;
  }
  return false;
}

function blocking(currentState: IState, status: IStatus): boolean {
  // Tweet
  if (status.user.id_str) {
    const id = status.user.id_str;
    if (currentState.blocks.includes(id) || currentState.mutes.includes(id)) {
      return true;
    }
  }
  if (status.retweeted_status && status.retweeted_status.user.id_str) {
    const id = status.retweeted_status.user.id_str;
    if (currentState.blocks.includes(id) || currentState.mutes.includes(id)) {
      return true;
    }
  }
  return false;
}

const state: IState = {
  blocks: [],
  friends: [],
  mutes: [],
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
  ADD_FRIEND(w: IState, id: string) {
    if (w.friends.includes(id)) {
      return;
    }
    w.friends.push(id);
  },
  ADD_FRIENDS(w: IState, ids: string[]) {
    const filtered = ids.filter((v) => !w.friends.includes(v));
    w.friends.push(...filtered);
  },
  ADD_BLOCK(w: IState, id: string) {
    if (w.blocks.includes(id)) {
      return;
    }
    w.blocks.push(id);
  },
  ADD_BLOCKS(w: IState, ids: string[]) {
    const filtered = ids.filter((v) => !w.blocks.includes(v));
    w.blocks.push(...filtered);
  },
  ADD_MUTE(w: IState, id: string) {
    if (w.mutes.includes(id)) {
      return;
    }
    w.mutes.push(id);
  },
  ADD_MUTES(w: IState, ids: string[]) {
    const filtered = ids.filter((v) => !w.mutes.includes(v));
    w.mutes.push(...filtered);
  },
  ADD_STATUS(w: IState, status: IStatus) {
    if (w.statuses.filter((v) => exists(w.statuses, status)).length > 0) {
      return;
    }
    if (blocking(w, status)) {
      return;
    }
    w.statuses.unshift(status);
    if (w.statuses.length >= 350) {
      for (let i = 350; i < w.statuses.length; i++) {
        w.statuses.pop();
      }
    }
  },
  ADD_STATUSES(w: IState, statuses: IStatus[]) {
    const filtered = statuses.filter((v) => {
      if (w.statuses.filter((x) => x.id_str === v.id_str).length > 0) {
        return false;
      }
      if (blocking(w, v)) {
        return false;
      }
      return true;
    });
    w.statuses.unshift(...filtered);
  },
  DELETE_STATUS(w: IState, status: IStatus) {
    w.statuses = w.statuses.filter((v) => v.id_str !== status.id_str);
  }
};

const actions = {
  // tslint:disable-next-line:no-shadowed-variable
  subscribeTimeline({ commit, state }: { commit: any, state: IState }, account: Account) {
    (async () => {
      if (state.subscribers.filter((w) => w.uuid === account.uuid).length > 0) {
        return;
      }
      commit("SUBSCRIBE_TIMELINE", account);
      commit("ADD_FRIEND", account.user.id);
      const client = credentials.findOrCreateClient(account);
      commit("ADD_STATUSES", (await client.homeTimeline()).reverse());
      commit("ADD_STATUSES", (await client.mentions()).reverse());
      client.userStream((event: string, data: any) => {
        switch (event) {
          case "friends":
            commit("ADD_FRIENDS", data);
            break;

          case "tweet":
            commit("ADD_STATUS", data);
            break;
        }
      });
    })();
  }
};

const getters = {
  statuses: (w: IState) => {
    return [...w.statuses].sort((a, b) => b.id - a.id);
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
