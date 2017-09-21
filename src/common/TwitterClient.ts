import * as Twit from "twit";

import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "./constants";
import { ITokens } from "./ITokens";

export class TwitterClient {
  private twitter: any;
  private friends: Set<number>;

  public constructor(tokens: ITokens) {
    this.twitter = new Twit({
      access_token: tokens.accessToken,
      access_token_secret: tokens.accessTokenSecret,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET
    });
    this.friends = new Set<number>();
  }

  public async verifyCredentials(): Promise<any> {
    return this.handle(await this.twitter.get("account/verify_credentials", {}));
  }

  public userStream(callback: (event) => void): void {
    const stream = this.twitter.stream("user", { stringify_friend_ids: true });
    stream.on("friends", (friends) => {
      console.log(friends);
    });
    stream.on("tweet", (tweet) => {
      callback(tweet);
    });
  }

  private async handle(response: { data: any, resp: any }): Promise<any> {
    if (response.data.errors === undefined) {
      return response.data;
    } else {
      throw response.data.errors;
    }
  }
}
