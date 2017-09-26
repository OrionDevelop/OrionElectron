<template lang="pug">
  .root
    sidearea(:account="mainAccount" :timelines="timelines")
    .contents
      .container
        timeline.column(v-for="timeline in timelines" :timeline="timeline")
    media-view
</template>

<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
