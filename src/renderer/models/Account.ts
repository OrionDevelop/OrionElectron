import { TwitterClient } from "./TwitterClient";

export class Account {
  public static createNull(): Account {
    return new Account(new TwitterClient("", ""), null);
  }

  // tslint:disable-next-line:variable-name
  public constructor(private _client: TwitterClient, private _user: any) {
  }

  get client(): TwitterClient {
    return this._client;
  }

  get user(): any {
    return this._user;
  }
}
