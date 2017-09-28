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
  private selected: string[] = this.accounts.length > 0 ? [this.accounts[0].uuid] : [];

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

  public get selectables(): string[] {
    return this.accounts.map((w) => w.uuid);
  }

  public get selectedAccounts(): Account[] {
    const accounts: Account[] = [];
    for (const uuid of this.selected) {
      accounts.push(this.accounts.filter((w) => w.uuid === uuid)[0]);
    }
    return accounts.filter((w) => w !== undefined);
  }

  public iconFor(uuid: string): string {
    return this.accounts.filter((w) => w.uuid === uuid)[0].user.profile_image_url_https;
  }

  public onSubmit(): void {
    const text = this.text;
    for (const account of this.selectedAccounts) {
      this.sendNewStatus({ status: text, account });
    }
    this.text = "";
  }
}
