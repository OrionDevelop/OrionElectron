import { uuid } from "../../common/utils";
import { Account } from "./Account";

export class Timeline {
  public static fromJson(json: any, accounts: Account[]): Timeline {
    const timeline = new Timeline(json.name, json.icon, json.query, json.local, json.order, accounts.find((w) => w.user.id === json.belongsTo) as Account);
    return timeline;
  }

  public static defaultTimelines(account: Account): Timeline[] {
    const timelines = [
      new Timeline("Home", "home", "true", true, 0, account),
      new Timeline("Mentions", "at", `status.text.includes("@${account.user.screen_name}")`, true, 1, account)
    ];
    return timelines;
  }

  public uuid: string;
  public name: string;
  public icon: string;
  public query: string;
  public local: boolean;
  public order: number;
  public account: Account;
  public belongsTo: number; // belongs to user_id

  public constructor(name: string, icon: string, query: string, local: boolean, order: number, account: Account) {
    this.uuid = uuid();
    this.name = name;
    this.icon = icon;
    this.query = query;
    this.local = local;
    this.order = order;
    this.account = account;
    this.belongsTo = account.user.id || 0;
  }

  public hostBy(): string {
    if (this.account !== null) {
      return `@${this.account.user.screen_name}`;
    } else {
      return "All";
    }
  }

  // tslint:disable-next-line:ban-types
  public filter(): Function {
    return new Function("status", `"use strict"; return ${this.query};`);
  }

  public toJson(): any {
    return {
      belongsTo: this.belongsTo || this.account.user.id,
      icon: this.icon,
      name: this.name,
      order: this.order,
      query: this.query
    };
  }
}
