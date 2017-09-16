<template lang="pug">
  el-card
    p
      | Hello
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Drawer extends Vue {
  @State((state: any) => state.Accounts.main)
  private acconts: Account[];
}
</script>
