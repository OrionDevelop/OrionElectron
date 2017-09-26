<template lang="pug">
  .root.yRnqoA01x6
    .retweet(v-if="isRetweet")
      small Retweeted by {{status.user.name}}
    .container
      .left
        img.icon(:src="user.profile_image_url_https")
      .right
        .header
          .name
            b(v-html="name")
            small @{{user.screen_name}}
          i.lock.el-icon-fa-lock(v-if="user.protected")
          .time
            a(:href="permalink" target="_blank")
              small {{time}}
        div.mention(v-if="hasMentions")
          small Replying to 
            a(href="#" v-for="mention in targetStatus().entities.user_mentions") @{{mention.screen_name}}
        div.text(v-html="text")
        media(:medias="medias")
</template>

<style lang="scss" src="./Status.scss" scoped></style>
<style lang="scss" src="./Status.global.scss"></style>
<script lang="ts" src="./Status.ts"></script>
