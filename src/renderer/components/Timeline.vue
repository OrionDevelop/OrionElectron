<template lang="pug">
  el-card.box-card
    div.header(slot="header")
      i.el-icon-fa-20(:class="icon")
      span {{timeline.name}}
      small {{timeline.hostBy()}}
      i.last.el-icon-fa-20.el-icon-fa-ellipsis-h
    div
      | Hello World
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

import { Timeline } from "../models/Timeline";

@Component
export default class TimelineComponent extends Vue {
  @Prop({ default: null })
  private timeline: Timeline;

  public get icon(): string {
    return `el-icon-fa-${this.timeline.icon}`;
  }

  private hasTimeline(): boolean {
    return this.timeline !== null;
  }
}
</script>
