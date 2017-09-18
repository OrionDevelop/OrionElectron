import { TwitterClient } from "./twitterclient";

export class Account {
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
