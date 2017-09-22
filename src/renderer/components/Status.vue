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
          .time
            a(:href="permalink" target="_blank")
              small {{time}}
        span(v-html="text")
</template>

<style lang="scss" scoped>
.root {
  padding: 5px 0px;
  padding-bottom: 15px;
}

.retweet {
  padding-left: 64px;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;

  small {
    font-size: 70%;
  }
}

.container {
  font-size: 14px;
  display: flex;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
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
        padding-left: 4px;
      }
    }

    span {
      line-height: 1.2;
    }
  }

  .icon {
    border-radius: 100%;
    height: 52px;
    width: 52px;
  }
}
</style>

<style lang="scss">
// for v-html
.yRnqoA01x6 {
  a {
    color: #7ac;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .emoji {
    width: 1em;
    height: 1em;
    padding: 0 .05em 0 .1em;
    vertical-align: -0.1em;
  }
}
</style>


<script lang="ts">
import * as moment from "moment";
import * as twemoji from "twemoji";
import * as twitter from "twitter-text";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { IStatus, IUser } from "../../common/twitter";

@Component
export default class StatusComponent extends Vue {
  @Prop()
  private status: IStatus;

  public get text(): string {
    const status = this.targetStatus();
    let text = "";
    let urlEntities: any = null;
    if (status.extended_tweet) {
      const range = status.extended_tweet.display_text_range;
      urlEntities = status.extended_tweet.entities.urls;
      text = status.extended_tweet.full_text.substring(range[0], range[1]);
    } else {
      text = status.full_text || status.text;
      urlEntities = status.entities.urls;
      if (status.display_text_range) {
        text = text.substring(status.display_text_range[0], status.display_text_range[1]);
      }
    }
    return twemoji.parse(twitter.autoLink(text, { urlEntities: urlEntities, targetBlank: true, })).replace("\\n", "<br />");
  }

  public get permalink(): string {
    return `https://twitter.com/${this.targetStatus().user.screen_name}/status/${this.targetStatus().id_str}`;
  }

  public get time(): string {
    return moment(this.targetStatus().created_at).fromNow(true);
  }

  public get user(): IUser {
    return this.targetStatus().user;
  }

  public get name(): string {
    return twemoji.parse(this.user.name);
  }

  public get isRetweet(): boolean {
    return this.status.retweeted_status ? true : false;
  }

  private targetStatus(): IStatus {
    return this.status.retweeted_status || this.status;
  }
}
</script>
