<template lang="pug">
  .root(v-loading.fullscreen.lock="needAuthenticate" element-loading-text="待機中...")
    sidearea(:mainAccount="mainAccount")
    .contents
      .container
</template>

<style lang="scss" scoped>
.root {
  display: flex;
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
import { Action, State } from "vuex-class";

import { Authorization } from "../models/authorization";
import { Credential } from "../models/credential";
import Sidearea from "./Home/Sidearea.vue";

@Component({
  components: {
    sidearea: Sidearea
  }
})
export default class Home extends Vue {

  @Prop({ default: "処理中..." })
  public text: string;

  @State((state: any) => state.Credentials.main)
  private credentials: Credential[];

  @State((state: any) => state.Accounts.main)
  private accounts: Account[];

  @Action("registerCredential")
  private registerCredential: (payload: Credential) => void;

  @Action("restoreCredential")
  private restoreCredential: (payload: Credential) => void;

  get needAuthenticate(): boolean {
    return this.credentials.length === 0;
  }

  get mainAccount(): Account {
    return this.accounts[0];
  }

  public mounted(): void {
    if (this.needAuthenticate) {
      const auth = new Authorization((credential: Credential) => {
        this.registerCredential(credential);
      });
    } else {
      for (const credential of this.credentials) {
        this.restoreCredential(credential);
      }
    }
  }
}
</script>
