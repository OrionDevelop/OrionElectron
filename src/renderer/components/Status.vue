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
        div.media(v-if="hasMedia")
          div(:class="mediaClass")
            img(:src="asThumb(media)" v-for="media in medias")
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

      .lock {
        color: gray;
        margin-right: 5px;
      }

      .time {
        flex-shrink: 0;

        a {
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      small {
        color: gray;
      }

      b+small {
        padding-left: 4px;
      }
    }

    .mention {
      color: slategrey;
      line-height: 1.0;
      margin-top: -2px;
      margin-bottom: 2px;

      a+a {
        margin-left: 2px;
      }
    }

    .text {
      line-height: 1.2;
    }

    .media {
      margin-top: 5px;

      img {
        overflow: hidden;
        border-radius: 4px;
        object-fit: cover;
      }

      .media-grid-1 {
        img {
          height: 130px;
          width: 220px;
        }
      }

      .media-grid-2 {
        img {
          height: 130px;
          width: 108px;

          &:nth-child(1) {
            margin-right: 2px;
          }

          &:nth-child(2) {
            margin-left: 2px;
          }
        }
      }

      .media-grid-3 {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        max-height: 130px;

        img {
          &:nth-child(1) {
            height: 130px;
            margin-right: 2px;
            width: 108px;
          }

          &:nth-child(2),
          &:nth-child(3) {
            height: 63px;
            margin-left: 2px;
            width: 108px;
          }

          &:nth-child(2) {
            margin-bottom: 2px;
          }

          &:nth-child(3) {
            margin-top: 2px;
          }
        }
      }

      .media-grid-4 {
        img {
          height: 64px;
          width: 108px;

          &:nth-child(1) {
            margin-right: 2px;
            margin-bottom: 1px;
          }

          &:nth-child(2) {
            margin-bottom: 1px;
            margin-left: 2px;
          }

          &:nth-child(3) {
            margin-right: 2px;
            margin-top: 1px;
          }

          &:nth-child(4) {
            margin-left: 2px;
            margin-top: 1px;
          }
        }
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

import { IMediaEntity, IStatus, IUser } from "../../common/twitter";

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
    this.medias.forEach(media => {
      text = text.replace(media.url, "");
    });
    return twemoji.parse(twitter.autoLink(`${text}`, { urlEntities: urlEntities, targetBlank: true, })).replace("\\n", "<br />");
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

  public get hasMedia(): boolean {
    return this.medias.length > 0;
  }

  public get medias(): IMediaEntity[] {
    let medias: IMediaEntity[] = [];
    // ???
    if (this.targetStatus().extended_tweet && this.targetStatus().extended_tweet.entities) {
      medias = medias.concat(this.targetStatus().extended_tweet.entities.media);
    } else if (this.targetStatus().extended_entities && this.targetStatus().extended_entities.media) {
      medias = medias.concat(this.targetStatus().extended_entities.media);
    } else if (this.targetStatus().entities.media) {
      medias = medias.concat(this.targetStatus().entities.media);
    }
    return medias;
  }

  public get mediaClass(): string {
    return `media-grid-${this.medias.length}`;
  }

  public asThumb(media: IMediaEntity): string {
    return `${media.media_url_https}:small`;
  }

  public get hasMentions(): boolean {
    if (this.targetStatus().in_reply_to_status_id === null) {
      return false;
    }
    return this.targetStatus().entities.user_mentions.length > 0;
  }

  private targetStatus(): IStatus {
    return this.status.retweeted_status || this.status;
  }
}
</script>
