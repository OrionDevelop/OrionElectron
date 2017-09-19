import { Account } from "./Account";

export class Timeline {
  public static fromJson(json: any, accounts: Account[]): Timeline {
    const timeline = new Timeline(json.name, json.icon, json.order, accounts.find((w) => w.user.id === json.belongsTo) as Account);
    return timeline;
  }

  public static defaultTimelines(account: Account): Timeline[] {
    const timelines = [
      new Timeline("Home", "home", 0, account),
      new Timeline("Mentions", "at", 1, account)
    ];
    return timelines;
  }

  public name: string;
  public icon: string;
  public order: number;
  public account: Account;
  public belongsTo: number; // belongs to user_id

  public constructor(name: string, icon: string, order: number, account: Account) {
    this.name = name;
    this.icon = icon;
    this.order = order;
    this.account = account;
    this.belongsTo = account.user.id;
  }

  public hostBy(): string {
    if (this.account !== null) {
      return `@${this.account.user.screen_name}`;
    } else {
      return "All";
    }
  }

  public toJson(): any {
    return {
      belongsTo: this.belongsTo || this.account.user.id,
      icon: this.icon,
      name: this.name,
      order: this.order
    };
  }
}
