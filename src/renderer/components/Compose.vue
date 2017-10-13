<template lang="pug">
  div(v-if="isVisible")
    el-card.box-card(:body-style="bodyStyle")
      div.header(slot="header")
        i.el-icon-fa-20.el-icon-fa-envelope-o
        span New Status
        i.last.el-icon-fa-20.el-icon-fa-times
      .content
        .section
          p Account
          el-checkbox-group(size="small" v-model="dust")
            el-checkbox-button(v-for="(uuid, index) in accounts.map((w) => w.uuid)" :checked="index === 0" @change="onChange($event, uuid)" :key="uuid")
              circle-image(:src="iconFor(uuid)" :height="48" :width="48")
        .section
          p Status
          el-input.dff4BcE1A7(type="textarea" v-model="text" :rows="5" v-shortkey="['ctrl', 'enter']" @shortkey.native="onSubmit()" placeholder="What's happening?")
          .right.send-button
            el-button(type="primary" :disabled="!canPost" @click="onSubmit") Send
</template>
<style lang="scss" src="./Compose.scss" scoped></style>
<style lang="scss" src="./Compose.global.scss"></style>
<script lang="ts" src="./Compose.ts"></script>
