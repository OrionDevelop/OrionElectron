import * as Twitter from "twitter";

import { Account } from "./account";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "./constants";

export class TwitterClient {
  // tslint:disable:variable-name
  private _twitter: any;
  // tslint:enable:variable-name

  public constructor(accessToken: string, accessTokenSecret: string) {
    this._twitter = new Twitter({
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
    });
  }

  public async verifyCredentials(): Promise<any> {
    // TODO: typing
    const res = await this._twitter.get("account/verify_credentials.json", {});
    return res;
  }
}
