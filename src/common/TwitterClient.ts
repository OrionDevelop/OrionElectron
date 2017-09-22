import * as Twit from "twit";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "./constants";
import { ITokens } from "./ITokens";
import {
  IStatus,
  IUser
} from "./twitter";

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

  public async verifyCredentials(): Promise<IUser> {
    return this.handle(await this.twitter.get("account/verify_credentials", {}));
  }

  public async homeTimeline(): Promise<IStatus> {
    return this.handle(await this.twitter.get("statuses/home_timeline", {}));
  }

  // STREAMING
  public userStream(callback: (event) => void): void {
    const stream = this.twitter.stream("user", { stringify_friend_ids: true, tweet_mode: "extended" });
    stream.on("friends", (friends) => {
      console.log(friends); // tslint:disable-line:no-console
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
