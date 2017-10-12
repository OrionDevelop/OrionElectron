import Vue from "vue";

import { TIMELINES_PATH } from "../../../common/constants";
import { appendFile, readFile } from "../../../common/io";
import { IStatus } from "../../../common/twitter";
import { IUserEvent } from "../../../common/twitter.stream";
import { uuid } from "../../../common/utils";
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";
import { IStatuses } from "../../models/IStatuses";
import { Timeline } from "../../models/Timeline";

enum Mutations {
  ADD_BLOCK = "ADD_BLOCK",
  ADD_BLOCKS = "ADD_BLOCKS",
  ADD_FRIEND = "ADD_FRIEND",
  ADD_FRIENDS = "ADD_FRIENDS",
  ADD_MUTE = "ADD_MUTE",
  ADD_MUTES = "ADD_MUTES",
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS",
  ADD_STATUS = "ADD_STATUS",
  ADD_STATUSES = "ADD_STATUSES",
  REMOVE_STATUS = "REMOVE_STATUS",
  ADD_TIMELINE = "ADD_TIMELINE",
  SUBSCRIBE_TIMELINE = "SUBSCRIBE_TIMELINE",
  UNSUBSCRIBE_TIMELINE = "UNSUBSCRIBE_TIMELINE"
}

interface IState {
  blocks: string[];
  friends: string[];
  mutes: string[];
  nonce: string;
  notifications: IUserEvent[];
  separated: IStatuses[];
  subscribers: Account[];
  timelines: Timeline[];
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
  nonce: "",
  notifications: [],
  separated: [],
  subscribers: [],
  timelines: []
};

const mutations = {
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
  ADD_NOTIFICATION(w: IState, notification: IUserEvent) {
    w.notifications.push(notification);
  },
  ADD_NOTIFICATIONS(w: IState, notifications: IUserEvent[]) {
    w.notifications.push(...notifications);
  },
  ADD_STATUS(w: IState, status: IStatus) {
    if (blocking(w, status)) {
      return;
    }
    for (const timeline of w.timelines) {
      if (timeline.filter(status, w.friends)) {
        const index = w.separated.findIndex((v) => v.uuid === timeline.uuid);
        const statuses = w.separated[index].statuses;
        if (statuses === undefined || exists(statuses, status)) {
          continue;
        }
        statuses.unshift(status);
        if (statuses.length >= 200) {
          for (let i = 200; i < statuses.length; i++) {
            statuses.pop();
          }
        }
      }
    }
  },
  ADD_STATUSES(w: IState, statuses: IStatus[]) {
    for (const timeline of w.timelines) {
      const index = w.separated.findIndex((v) => v.uuid === timeline.uuid);
      const innerStatuses = w.separated[index].statuses;
      for (const status of statuses.filter((v) => !blocking(w, v))) {
        if (timeline.filter(status, w.friends)) {
          if (innerStatuses === undefined || exists(innerStatuses, status)) {
            continue;
          }
          innerStatuses.unshift(status);
          if (innerStatuses.length >= 200) {
            for (let i = 200; i < innerStatuses.length; i++) {
              innerStatuses.pop();
            }
          }
        }
      }
      Vue.set(w.separated[index], "statuses", innerStatuses.sort((a, b) => b.id - a.id));
    }
  },
  REMOVE_STATUS(w: IState, status: any[]) {
    //
  },
  ADD_TIMELINE(w: IState, timeline: Timeline) {
    w.timelines.push(timeline);
    w.separated.push({ uuid: timeline.uuid, statuses: [] });
  },
  SUBSCRIBE_TIMELINE(w: IState, subscriber: Account) {
    w.subscribers.push(subscriber);
  },
  UNSUBSCRIBE_TIMELINE(w: IState, subscriber: Account) {
    w.subscribers = w.subscribers.filter((v) => v.uuid !== subscriber.uuid);
  },
};

const actions = {
  /* Statuses */
  // tslint:disable-next-line:no-shadowed-variable
  subscribeTimeline({ commit, state }: { commit: any, state: IState }, account: Account) {
    (async () => {
      if (state.subscribers.filter((w) => w.uuid === account.uuid).length > 0) {
        return;
      }
      commit(Mutations.SUBSCRIBE_TIMELINE, account);
      commit(Mutations.ADD_FRIEND, `${account.user.id}`);
      const client = credentials.findOrCreateClient(account);
      commit(Mutations.ADD_STATUSES, (await client.homeTimeline()).reverse());
      commit(Mutations.ADD_STATUSES, (await client.mentions()).reverse());
      client.userStream((event: string, data: any) => {
        switch (event) {
          case "friends":
            commit(Mutations.ADD_FRIENDS, data);
            break;

          case "tweet":
            commit(Mutations.ADD_STATUS, data);
            break;

          case "delete":
            commit(Mutations.REMOVE_STATUS, data.delete.status);
            break;

          case "user_event":
            switch ((data as IUserEvent).event) {
              case "favorite":
              case "follow":
              case "quoted_tweet":
              case "retweeted_retweet":
              case "favorited_retweet":
                commit(Mutations.ADD_NOTIFICATION, data);
            }
            break;
        }
      });
    })();
  },
  /* Timeline */
  addTimeline({ commit }, timeline: Timeline) {
    commit(Mutations.ADD_TIMELINE, timeline);
    appendFile(TIMELINES_PATH, [], (content) => {
      content.push(timeline.toJson());
      return content;
    });
  },
  restoreTimelines({ commit }, accounts: Account[]) {
    const text = readFile(TIMELINES_PATH);
    const timelines = JSON.parse(text === "" ? "[]" : text);
    for (const timeline of timelines) {
      commit(Mutations.ADD_TIMELINE, Timeline.fromJson(timeline, accounts));
    }
  },
  prepareDefaultTimelines({ commit }, account: Account) {
    for (const timeline of Timeline.defaultTimelines(account)) {
      appendFile(TIMELINES_PATH, [], (content) => {
        content.push(timeline.toJson());
        return content;
      });
      commit(Mutations.ADD_TIMELINE, timeline);
    }
  }
};

const getters = {
  timelines: (w: IState) => {
    return w.timelines.slice().sort((a, b) => a.order - b.order);
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
