<template lang="pug">
  div(v-if="isVisible")
    el-card.box-card(:body-style="bodyStyle")
      div.header(slot="header")
        i.el-icon-fa-20.el-icon-fa-envelope-o
        span New Tweet
        i.last.el-icon-fa-20.el-icon-fa-times
      .content
        p Account
        
</template>
<style lang="scss" src="./Compose.scss" scoped></style>
<script lang="ts" src="./Compose.ts"></script>
