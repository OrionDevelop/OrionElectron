import * as Twitter from "twitter";

import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "../../common/constants";
import { ITokens } from "./ITokens";

export class TwitterClient {
  private twitter: any;

  public constructor(tokens: ITokens) {
    this.twitter = new Twitter({
      access_token_key: tokens.accessToken,
      access_token_secret: tokens.accessTokenSecret,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET
    });
  }

  public async verifyCredentials(): Promise<any> {
    return await this.twitter.get("account/verify_credentials.json", {});
  }
}
