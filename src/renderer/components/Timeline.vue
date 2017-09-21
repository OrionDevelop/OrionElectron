<template lang="pug">
  el-card.box-card
    div.header(slot="header")
      i.el-icon-fa-20(:class="icon")
      span {{timeline.name}}
      small {{timeline.hostBy()}}
      i.last.el-icon-fa-20.el-icon-fa-ellipsis-h
    div
      div(v-for="status in statuses")
        p {{status.text}}
</template>

<style lang="scss" scoped>
.box-card {
  width: 320px;
}

.header {
  display: flex;
  flex-flow: row;
  align-items: baseline;

  .last {
    margin-left: auto;
  }
}

i {
  padding-right: 5px;
  font-size: 80%;
}

span+small {
  margin-left: 5px;
}

small {
  color: gray;
}
</style>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import { Account } from "../models/Account";
import { Timeline } from "../models/Timeline";

@Component
export default class TimelineComponent extends Vue {
  @Prop({ default: null })
  private timeline: Timeline;

  @Action
  private subscribeTimeline: (account: Account) => void;

  @Getter("statuses")
  private statuses: any[];

  public get icon(): string {
    return `el-icon-fa-${this.timeline.icon}`;
  }

  public mounted(): void {
    this.subscribeTimeline(this.timeline.account);
  }

  private hasTimeline(): boolean {
    return this.timeline !== null;
  }
}
</script>
