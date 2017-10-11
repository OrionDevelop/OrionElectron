<template lang="pug">
  el-card.box-card(:body-style="bodyStyle")
    div.header(slot="header")
      i.el-icon-fa-lg(:class="icon")
      span {{timeline.name}}
      small {{timeline.hostBy()}}
      i.last.el-icon-fa-lg.el-icon-fa-ellipsis-h
    .content
      status(v-for="status in statuses" :status="status" :key="status.id_str")
</template>

<style lang="scss" src="./Timeline.scss" scoped></style>
<script lang="ts" src="./Timeline.ts"></script>
