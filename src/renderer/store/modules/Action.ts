// store for UI actions.
import { IMediaDialogParams } from "../../models/parameters";

interface IState {
  mediaDialog: IMediaDialogParams;
}

const state: IState = {
  mediaDialog: {
    index: 0,
    isVisible: false,
    medias: [],
    nonce: ""
  } as IMediaDialogParams
};

const mutations = {
  SWITCH_MEDIA_DIALOG(w: IState, params: IMediaDialogParams) {
    w.mediaDialog = params;
  }
};

const actions = {
  switchMediaDialog({ commit }, params: IMediaDialogParams) {
    commit("SWITCH_MEDIA_DIALOG", params);
  }
};

const getters = {
  mediaDialogParams: (w: IState) => {
    return w.mediaDialog;
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
