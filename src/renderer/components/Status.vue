<template lang="pug">
  .container
    .left
      img.icon(:src="user.profile_image_url_https")
    .right
      .header
        .name
          b {{user.name}}
          small @{{user.screen_name}}
        .time
          a(:href="permalink")
            small {{time}}
      span {{text}}
</template>

<style lang="scss" scoped>
.container {
  font-size: 14px;
  padding: 5px 0px;
  padding-bottom: 15px;
  display: flex;

  .left {
    width: 64px;
  }

  .right {
    max-width: calc(100% - 64px);
    width: calc(100% - 64px);

    .header {
      align-items: baseline;
      display: flex;

      .name {
        flex: 1 1 auto;
        overflow: hidden;
        padding-right: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .time {
        flex-shrink: 0;

        a {
          text-decoration: none;
        }
      }

      small {
        color: gray;
      }

      b+small {
        padding-left: 2.5px;
      }
    }
  }

  .icon {
    border-radius: 100%;
    height: 52px;
    width: 52px;
  }
}
</style>

<script lang="ts">
import * as moment from "moment";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { IStatus, IUser } from "../../common/twitter";

@Component
export default class StatusComponent extends Vue {
  @Prop()
  private status: IStatus;

  public get text(): string {
    if (this.status.extended_tweet) {
      const range = this.status.extended_tweet.display_text_range;
      return this.status.extended_tweet.full_text.substring(range[0], range[1]);
    } else {
      const text = this.status.full_text || this.status.text;
      if (this.status.display_text_range) {
        return text.substring(this.status.display_text_range[0], this.status.display_text_range[1]);
      }
      return text;
    }
  }

  public get permalink(): string {
    return `https://twitter.com/${this.status.user.screen_name}/status/${this.status.id}`;
  }

  public get time(): string {
    return moment(this.status.created_at).fromNow(true);
  }

  public get user(): IUser {
    return this.status.user;
  }
}
</script>
