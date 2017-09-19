import { TIMELINES_PATH } from "../../../common/constants";
import { appendFile, readFile } from "../../../common/io";
import { Account } from "../../models/Account";
import { Timeline } from "../../models/Timeline";

interface IState {
  timelines: Timeline[];
}

const state: IState = {
  timelines: []
};

const mutations = {
  ADD_TIMELINE(w: IState, timeline: Timeline) {
    w.timelines.push(timeline);
  }
};

const actions = {
  addTimeline({ commit }, timeline: Timeline) {
    commit("ADD_TIMELINE", timeline);
    appendFile(TIMELINES_PATH, [], (content) => {
      content.push(timeline.toJson());
      return content;
    });
  },
  restoreTimelines({ commit }, accounts: Account[]) {
    const text = readFile(TIMELINES_PATH);
    const timelines = JSON.parse(text === "" ? "[]" : text);
    for (const timeline of timelines) {
      commit("ADD_TIMELINE", Timeline.fromJson(timeline, accounts));
    }
  },
  prepareDefaultTimelines({ commit }, account: Account) {
    for (const timeline of Timeline.defaultTimelines(account)) {
      appendFile(TIMELINES_PATH, [], (content) => {
        content.push(timeline.toJson());
        return content;
      });
      commit("ADD_TIMELINE", timeline);
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
