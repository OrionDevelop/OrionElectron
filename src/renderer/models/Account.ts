import { TwitterClient } from "./TwitterClient";

export class Account {
  public static createNull(): Account {
    return new Account(new TwitterClient("", ""), null, true);
  }

  // tslint:disable-next-line:variable-name
  public constructor(private _client: TwitterClient, private _user: any, private _isNull: boolean = false) {
  }

  get client(): TwitterClient {
    return this._client;
  }

  get user(): any {
    return this._user;
  }

  get isNull(): boolean {
    return this._isNull;
  }
}
