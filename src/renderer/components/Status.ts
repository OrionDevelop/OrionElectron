import * as moment from "moment";
import * as twemoji from "twemoji";
import * as twitter from "twitter-text";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { IMediaEntity, IStatus, IUser } from "../../common/twitter";
import { convertToISOFormat } from "../../common/utils";
import MediaComponent from "./status/Media.vue";

@Component({
  components: {
    media: MediaComponent
  }
})
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
    if (this.medias.length > 0) {
      this.medias.forEach((media) => {
        text = text.replace(media.url, "");
      });
    }
    return twemoji.parse(twitter.autoLink(`${text}`, { urlEntities, targetBlank: true, })).replace("\\n", "<br />");
  }

  public get permalink(): string {
    return `https://twitter.com/${this.targetStatus().user.screen_name}/status/${this.targetStatus().id_str}`;
  }

  public get time(): string {
    return moment(convertToISOFormat(this.targetStatus().created_at)).fromNow(true);
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
    return medias.filter((w) => w !== undefined);
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