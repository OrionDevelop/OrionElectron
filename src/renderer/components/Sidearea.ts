import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

import { Account } from "../models/Account";
import { Timeline } from "../models/Timeline";

@Component
export default class SideareaComponent extends Vue {

  @Prop({ default: true })
  public isCollapse: boolean;

  @Prop({ default: null })
  public account: Account;

  @Prop()
  public timelines: Timeline[];

  // Computed
  get icon(): string {
    if (this.hasAccount()) {
      return this.account.user.profile_image_url_https.replace("normal", "bigger");
    }
    return "https://placehold.jp/36x36.png";
  }

  get username(): string {
    if (this.hasAccount()) {
      return this.account.user.name;
    }
    return "You";
  }

  public indexize(index: number): string {
    return `1-${index}`;
  }

  private hasAccount(): boolean {
    return this.account !== null;
  }
}
