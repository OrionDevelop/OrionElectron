import { TwitterClient } from "../../common/TwitterClient";
import { Account } from "./Account";

// Twitter Client Store
class Credentials {

  private store: {};

  public constructor() {
    this.store = {};
  }

  public createClient(account: Account) {
    this.store[account.uuid] = new TwitterClient(account.tokens);
  }

  public getClient(account: Account): TwitterClient {
    return this.store[account.uuid] || null;
  }

  public findOrCreateClient(account: Account): TwitterClient {
    if (this.getClient(account) === null) {
      this.createClient(account);
    }
    return this.getClient(account);
  }
}

const credentials = new Credentials();

export {
  credentials
};
