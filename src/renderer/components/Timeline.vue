<template lang="pug">
  el-card.box-card(:body-style="bodyStyle")
    div.header(slot="header")
      i.el-icon-fa-20(:class="icon")
      span {{timeline.name}}
      small {{timeline.hostBy()}}
      i.last.el-icon-fa-20.el-icon-fa-ellipsis-h
    .content
      status(v-for="status in filtered" :status="status")
</template>

<style lang="scss" src="./Timeline.scss" scoped></style>
<script lang="ts" src="./Timeline.ts"></script>
