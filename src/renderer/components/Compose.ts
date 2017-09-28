import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import { Action, State } from "vuex-class";

import { Account } from "../models/Account";
import { credentials } from "../models/Credentials";
import { IStatusUpdateParams } from "../models/parameters";
import CircleImageComponent from "./controls/CircleImage.vue";

@Component({
  components: {
    "circle-image": CircleImageComponent
  }
})
export default class ComposeComponent extends Vue {
  public isVisible: boolean = true;

  @Prop()
  private accounts: Account[];

  @Provide()
  private selected: Account[] = [this.accounts[0]];

  @Provide()
  private text: string = "";

  @Action("sendNewStatus")
  private sendNewStatus: (params: IStatusUpdateParams) => void;

  public get bodyStyle(): any {
    return {
      "height": "100%",
      "max-height": "calc(100% - 60px)",
      "overflow-y": "auto",
      "padding": "0 10px"
    };
  }

  public onSubmit(): void {
    const text = this.text;
    for (const account of this.selected.filter((w) => w !== undefined)) {
      this.sendNewStatus({ status: text, account });
    }
    this.text = "";
  }
}
