<template lang="pug">
  .root
    sidearea
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

import Sidearea from "./Home/Sidearea.vue";

@Component({
  components: {
    sidearea: Sidearea
  }
})
export default class Home extends Vue {
  public mounted(): void {

  }
}
</script>
