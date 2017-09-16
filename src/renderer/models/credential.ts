import { uuid } from "./utils";

import { Account } from "./account";
import { TwitterClient } from "./twitterclient";

export class Credential {
  public static async restore(credential: Credential): Promise<Account> {
    const client = new TwitterClient(credential.accessToken, credential.accessTokenSecret);
    const user = await client.verifyCredentials();

    return new Account(client, user);
  }

  // tslint:disable:variable-name
  private _id: string;
  private _provider: string;
  // tslint:enable:variable-name

  public constructor(provider: string, private accessToken: string, private accessTokenSecret: string) {
    this._id = uuid();
    this._provider = provider;
  }

  get id(): string {
    return this._id;
  }

  get provider(): string {
    return this._provider;
  }
}
