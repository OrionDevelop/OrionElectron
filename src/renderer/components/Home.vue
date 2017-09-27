<template lang="pug">
  .root
    sidearea(:account="mainAccount" :timelines="timelines")
    .contents
      .container
        compose
        timeline.column(v-for="timeline in timelines" :timeline="timeline" :key="timeline.uuid")
    media-view
</template>

<style lang="scss" src="./Home.scss" scoped></style>
<script lang="ts" src="./Home.ts"></script>
