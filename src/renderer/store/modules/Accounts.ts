import { Authentication } from "../../../common/auth";
import { ITokens } from "../../../common/ITokens";
import { ICursored } from "../../../common/twitter";
import { Account } from "../../models/Account";
import { credentials } from "../../models/Credentials";

async function fetchAll(commit, mutation: string, caller: (cursor: number) => Promise<ICursored<string>>): Promise<void> {
  let cursor = -1;
  while (true) {
    const cursored = await caller(cursor);
    commit(mutation, cursored.ids);
    if (cursored.next_cursor !== 0) {
      cursor = cursored.next_cursor;
    } else {
      return;
    }
  }
}

interface IState {
  accounts: Account[];
}

const state: IState = {
  accounts: []
};

const mutations = {
  ADD_ACCOUNT(w: IState, account: Account) {
    w.accounts.push(account);
  }
};

const actions = {
  addAccount({ commit }, tokens: ITokens) {
    (async () => {
      try {
        const account = new Account(tokens);
        const client = credentials.findOrCreateClient(account);
        account.user = await client.verifyCredentials();
        commit("ADD_ACCOUNT", account);
        // to Statuses.blocks/mutes
        await fetchAll(commit, "ADD_BLOCKS", (cursor: number) => client.blockIds(cursor));
        await fetchAll(commit, "ADD_MUTES", (cursor: number) => client.muteIds(cursor));
      } catch (err) {
        // ignored
      }
    })();
  }
};

const getters = {
  accounts: (w: IState) => {
    return w.accounts.slice().sort((a, b) => a.order - b.order);
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
