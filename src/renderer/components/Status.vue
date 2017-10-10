<template lang="pug">
  .root.yRnqoA01x6
    .retweet(v-if="isRetweet")
      .left
        small
          span.el-icon-fa.el-icon-fa-retweet
      .right
        small Retweeted by 
          span(v-html="rtname")
    .container
      .left
        circle-image.box(:src="icon" :height="52" :width="52")
        .box(v-if="user.verified")
          .verified
            .el-icon-fa-stack
              .el-icon-fa.el-icon-fa-certificate.el-icon-fa-stack-2x.layer1
              .el-icon-fa.el-icon-fa-check.el-icon-fa-stack-1x.el-icon-fa-inverse.layer2
      .right
        .header
          .name
            b(v-html="name")
            small @{{user.screen_name}}
          i.lock.el-icon-fa-lock(v-if="user.protected")
          .time
            a(:href="permalink" target="_blank")
              small
                timeago(:since="time" :auto-update="10" :max-time="86400 * 30")
        div.mention(v-if="hasMentions")
          small Replying to 
            a(href="#" v-for="mention in targetStatus().entities.user_mentions") @{{mention.screen_name}}
        div.text(v-html="text")
        media(:medias="medias")
</template>

<style lang="scss" src="./Status.scss" scoped></style>
<style lang="scss" src="./Status.global.scss"></style>
<script lang="ts" src="./Status.ts"></script>
