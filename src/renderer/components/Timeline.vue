<template lang="pug">
  el-card.box-card
    div.header(slot="header")
      i.el-icon-fa-20.el-icon-fa-home
      span {{name}}
      small {{who}}
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
  color: silver;
}
</style>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { Timeline } from "../models/Timeline";

@Component
export default class TimelineComponent extends Vue {
  @Prop()
  private timeline: Timeline;

  public get name(): string {
    return this.timeline.name;
  }

  public get who(): string {
    return this.timeline.name || "All";
  }
}
</script>
