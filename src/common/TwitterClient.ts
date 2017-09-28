import * as Twit from "twit";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "./constants";
import { ITokens } from "./ITokens";
import {
  ICursored,
  IStatus,
  IUser
} from "./twitter";

export class TwitterClient {
  private twitter: any;

  public constructor(tokens: ITokens) {
    this.twitter = new Twit({
      access_token: tokens.accessToken,
      access_token_secret: tokens.accessTokenSecret,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET
    });
  }

  public async verifyCredentials(): Promise<IUser> {
    return this.handle(await this.twitter.get("account/verify_credentials", {}));
  }

  public async homeTimeline(): Promise<IStatus[]> {
    return this.handle(await this.twitter.get("statuses/home_timeline", { tweet_mode: "extended" }));
  }

  public async mentions(): Promise<IStatus[]> {
    return this.handle(await this.twitter.get("statuses/mentions_timeline", { tweet_mode: "extended" }));
  }

  public async blockIds(cursor: number): Promise<ICursored<string>> {
    return this.handle(await this.twitter.get("blocks/ids", { cursor, stringify_ids: true }));
  }

  public async muteIds(cursor: number): Promise<ICursored<string>> {
    return this.handle(await this.twitter.get("mutes/users/ids", { cursor, stringify_ids: true }));
  }

  public async updateStatus(status: string): Promise<void> {
    this.handle(await this.twitter.post("statuses/update", { status }));
  }

  // STREAMING
  public userStream(callback: (event: string, data: any) => void): void {
    const stream = this.twitter.stream("user", { stringify_friend_ids: true, tweet_mode: "extended" });
    stream.on("friends", (friends) => {
      callback("friends", friends.friends_str.map((w) => parseInt(w, 10)));
    });
    stream.on("tweet", (tweet) => {
      callback("tweet", tweet);
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
