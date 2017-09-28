<template lang="pug">
  div(v-if="isVisible")
    el-card.box-card(:body-style="bodyStyle")
      div.header(slot="header")
        i.el-icon-fa-20.el-icon-fa-envelope-o
        span New Tweet
        i.last.el-icon-fa-20.el-icon-fa-times
      .content
        .section
          p Account
          el-checkbox-group(size="small" v-model="selected" :min="1")
            el-checkbox-button(v-for="account in accounts" :key="account.uuid")
              circle-image(:src="account.user.profile_image_url_https" :height="48" :width="48")
        .section
          p Tweet
          el-input.dff4BcE1A7(type="textarea" v-model="text" :rows="7" v-shortkey="['ctrl', 'enter']" @shortkey.native="onSubmit()" placeholder="What's happening?")
          .right.send-button
            el-button(type="primary" :disabled="text.length <= 0" @click="onSubmit") Send
</template>
<style lang="scss" src="./Compose.scss" scoped></style>
<style lang="scss" src="./Compose.global.scss"></style>
<script lang="ts" src="./Compose.ts"></script>
