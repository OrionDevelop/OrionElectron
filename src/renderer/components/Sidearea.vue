<template lang="pug">
  el-menu.sidebar(default-active="1" :collapse="isCollapse")
    el-submenu(index="1")
      template(slot="title")
        i.el-icon-fa-lg.el-icon-fa-list
      el-menu-item-group
        span(slot="title") Timelines
        el-menu-item(index="1-1") item one
        el-menu-item(index="1-2") item two
        el-menu-item(index="1-3") item three
        el-menu-item(index="1-4-") item one
    el-menu-item(index="2")
      i.el-icon-menu
      span(slot="title") Navigator Two
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
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import { Account } from "../models/Account";

@Component
export default class Home extends Vue {

  @Prop({ default: true })
  public isCollapse: boolean;

  @Getter("accounts")
  public accounts: Account[];

  get icon(): string {
    if (this.hasAccount()) {
      const account = this.accounts[0];
      return account.user.profile_image_url_https.replace("normal", "bigger");
    }
    return "https://placehold.jp/36x36.png";
  }

  get username(): string {
    return "unknown user";
  }

  private hasAccount(): boolean {
    return this.accounts.length > 0;
  }
}
</script>
