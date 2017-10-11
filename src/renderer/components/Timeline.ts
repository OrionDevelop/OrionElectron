import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

import { IStatus } from "../../common/twitter";
import { Account } from "../models/Account";
import { IStatuses } from "../models/IStatuses";
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

  @State((state: any) => state.System.separated)
  private separated: IStatuses[];

  @State((state: any) => state.System.friends)
  private friends: string[];

  public get icon(): string {
    return `el-icon-fa-${this.timeline.icon}`;
  }

  public get statuses(): IStatus[] {
    return this.separated[this.separated.findIndex((w) => w.uuid === this.timeline.uuid)].statuses;
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
