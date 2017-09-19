<template lang="pug">
  el-menu.sidebar(default-active="1" :collapse="isCollapse")
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-fa-lg.el-icon-fa-list
      el-menu-item-group
        span(slot="title") TIMELINES
        el-menu-item(v-for="(timeline, index) in timelines" :index="indexize(index)")
          span {{timeline.name}}
          small {{timeline.hostBy()}}
    .bottom-wrap
      .bottom
        el-menu-item.fix-for-icon(index="2")
          img.icon(:src="icon")
          span(slot="title") You
        el-menu-item(index="3")
          i.el-icon-fa-lg.el-icon-fa-gear
          span(slot="title") Settings
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  height: 100vh;
  max-height: 100vh;

  &::not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .fix-for-icon {
    .icon {
      border-radius: 100%;
      height: 36px;
      width: 36px;
    }
  }

  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
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
import { Getter } from "vuex-class";

import { Account } from "../models/Account";
import { Timeline } from "../models/Timeline";

@Component
export default class Home extends Vue {

  @Prop({ default: true })
  public isCollapse: boolean;

  @Prop({ default: null })
  public account: Account;

  @Prop()
  public timelines: Timeline[];

  // Computed
  get icon(): string {
    if (this.hasAccount()) {
      return this.account.user.profile_image_url_https.replace("normal", "bigger");
    }
    return "https://placehold.jp/36x36.png";
  }

  get username(): string {
    return "unknown user";
  }

  public indexize(index: number): string {
    return `1-${index}`;
  }

  private hasAccount(): boolean {
    return this.account !== null;
  }
}
</script>
