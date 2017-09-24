import { IStatus } from "../../../common/twitter";
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";

interface IState {
  friends: number[];
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

const state: IState = {
  friends: [],
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
  ADD_FRIEND(w: IState, id: number) {
    if (w.friends.filter((v) => v === id).length > 0) {
      return;
    }
    w.friends.push(id);
  },
  ADD_STATUS(w: IState, status: IStatus) {
    if (w.statuses.filter((v) => exists(w.statuses, status)).length > 0) {
      return;
    }
    w.statuses.unshift(status);
    if (w.statuses.length >= 350) {
      for (let i = 350; i < w.statuses.length; i++) {
        w.statuses.pop();
      }
    }
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
      (await client.homeTimeline()).reverse().forEach((w) => commit("ADD_STATUS", w));
      (await client.mentions()).reverse().forEach((w) => commit("ADD_STATUS", w));
      client.userStream((event: string, data: any) => {
        switch (event) {
          case "friends":
            for (const id of data) {
              commit("ADD_FRIEND", id);
            }
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
