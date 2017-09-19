<template lang="pug">
  .root
    sidearea
    .contents
      .container
        // timeline.column(v-for="_ in 5")
</template>

<style lang="scss" scoped>
.root {
  display: flex;
}

.contents {
  display: flex;
  flex: 1;
}

.container {
  display: flex;
  overflow-x: auto;
  padding: 5px;
  width: calc(100vw - 82px);
}

.column {
  margin: 0px 2.5px;
  min-width: 320px;
  min-height: calc(100% - 20px);
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import Sidearea from "./Sidearea.vue";
import Timeline from "./Timeline.vue";
import { ITokens } from "../models/ITokens";
import { Authentication } from "../../common/auth";

@Component({
  components: {
    sidearea: Sidearea,
    timeline: Timeline,
  }
})
export default class Home extends Vue {

  @Action("addAccount")
  public addAccount: (tokens: ITokens) => void;

  public mounted(): void {
    Authentication.accounts.forEach((w) => {
      this.addAccount(w);
    });
  }
}
</script>
