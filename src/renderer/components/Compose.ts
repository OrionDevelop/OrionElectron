import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
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
  private handled: boolean = false;

  @Prop()
  private accounts: Account[];

  // el-checkbox-group, el-checkbox-button is not working.
  // This variable is `dust`, do not call in other functions, getters, properties and component.
  @Provide()
  private dust: string[] = [];

  @Provide()
  private text: string = "";

  @Provide()
  private selectedAccounts: Account[] = [];

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

  public iconFor(uuid: string): string {
    return this.accounts.filter((w) => w.uuid === uuid)[0].user.profile_image_url_https;
  }

  @Watch("accounts")
  public onAccountsChanged(newValue: Account[], oldValue: Account[]): void {
    if (this.handled || newValue.length === 0) {
      return;
    }
    this.selectedAccounts.push(newValue[0]);
    this.handled = true;
  }

  public onChange(event, uuid): void {
    if (event.target.checked) {
      this.selectedAccounts.push(this.accounts.filter((w) => w.uuid === uuid)[0]);
    } else {
      this.selectedAccounts = this.selectedAccounts.filter((w) => w.uuid !== uuid);
    }
  }

  public onSubmit(): void {
    const text = this.text;
    for (const account of this.selectedAccounts.filter((w) => w !== undefined)) {
      this.sendNewStatus({ status: text, account });
    }
    this.text = "";
  }
}
