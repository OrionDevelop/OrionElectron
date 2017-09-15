<template lang="pug">
  .root(v-loading.fullscreen.lock="needAuthenticate" element-loading-text="待機中...")
    .drawer
      .container
        el-card
          p
            | Hello
    .contents
      .container
</template>

<style lang="scss" scoped>
.root {
  display: flex;
}

.drawer {
  width: 300px;
}

.contents {
  flex: 1;
}

.container {
  padding: 5px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import { Action, State } from "vuex-class";

import { Account } from "../models/account";
import { Authorization } from "../models/authorization";

@Component
export default class Home extends Vue {

  @Prop({ default: "処理中..." })
  public text: string;

  @State((state: any) => state.Accounts.main)
  private accounts: Account[];

  @Action("registerAccount")
  private registerAccount: (payload: Account) => void;

  get needAuthenticate(): boolean {
    return this.accounts.length === 0;
  }

  public mounted(): void {
    if (this.needAuthenticate) {
      const auth = new Authorization((account: Account) => {
        this.registerAccount(account);
      });
    }
  }
}
</script>
