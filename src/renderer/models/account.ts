import { TwitterClient } from "./twitterclient";

export class Account {
  // tslint:disable-next-line:variable-name
  public constructor(private _client: TwitterClient, public user: any) {
  }

  get client(): TwitterClient {
    return this._client;
  }
}
