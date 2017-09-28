// store for UI actions.
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";
import { IMediaDialogParams, IStatusUpdateParams } from "../../models/parameters";

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
  },
  sendNewStatus({ commit }, params: IStatusUpdateParams) {
    (async () => {
      const client = credentials.findOrCreateClient(params.account);
      await client.updateStatus(params.status);
    })();
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
