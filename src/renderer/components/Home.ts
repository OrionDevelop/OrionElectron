import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import { Authentication } from "../../common/auth";
import { ITokens } from "../../common/ITokens";
import { Account } from "../models/Account";
import { Timeline } from "../models/Timeline";
import MediaViewComponent from "./MediaView.vue";
import Sidearea from "./Sidearea.vue";
import TimelineComponent from "./Timeline.vue";

@Component({
  components: {
    "media-view": MediaViewComponent,
    "sidearea": Sidearea,
    "timeline": TimelineComponent,
  }
})
export default class HomeComponent extends Vue {

  @Action("addAccount")
  private addAccount: (tokens: ITokens) => void;

  @Action("restoreTimelines")
  private restoreTimelines: (accounts: Account[]) => void;

  @Action("prepareDefaultTimelines")
  private prepareDefaultTimelines: (account: Account) => void;

  @Getter("accounts")
  private accounts: Account[];

  @Getter("timelines")
  private timelines: Timeline[];

  private started: boolean = false;

  get mainAccount(): Account | null {
    if (this.accounts.length > 0) {
      return this.accounts[0];
    } else {
      return null;
    }
  }

  public mounted(): void {
    Authentication.accounts.forEach((w, index) => {
      this.addAccount(w);
      if ((index + 1) >= Authentication.accounts.length) {
        this.started = true;
      }
    });
  }

  @Watch("accounts")
  public onAccountsChanged(newVal: Account[], oldVal: Account[]) {
    if (!this.started) {
      return;
    }
    this.started = false;
    if (this.timelines.length === 0) {
      this.restoreTimelines(this.accounts);
    }
    if (this.timelines.length === 0) {
      this.prepareDefaultTimelines(this.accounts[0]);
    }
  }
}