import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import { IStatus } from "../../common/twitter";
import { Account } from "../models/Account";
import { Timeline } from "../models/Timeline";
import StatusComponent from "./Status.vue";

@Component({
  components: {
    status: StatusComponent
  }
})
export default class TimelineComponent extends Vue {
  @Prop({ default: null })
  private timeline: Timeline;

  @Action
  private subscribeTimeline: (account: Account) => void;

  @Getter("statuses")
  private statuses: IStatus[];

  @State((state: any) => state.Statuses.friends)
  private friends: number[];

  public get icon(): string {
    return `el-icon-fa-${this.timeline.icon}`;
  }

  public get filtered(): IStatus[] {
    return this.statuses.filter((w) => this.timeline.filter(w, this.friends));
  }

  public get bodyStyle(): any {
    return {
      "flex": "1 1 auto",
      "max-height": "calc(100% - 60px)",
      "overflow-y": "auto",
      "padding": "0 10px"
    };
  }

  public mounted(): void {
    this.subscribeTimeline(this.timeline.account);
  }

  private hasTimeline(): boolean {
    return this.timeline !== null;
  }
}
