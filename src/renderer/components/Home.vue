<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <landing-page />
  </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  @Prop({ default: true })
  public fullscreenLoading: boolean;
}
</script>
