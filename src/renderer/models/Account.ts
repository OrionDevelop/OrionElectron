import { ITokens } from "../../common/ITokens";
import { TwitterClient } from "../../common/TwitterClient";

export class Account {
  public readonly client: TwitterClient;
  public readonly order: number;
  // tslint:disable-next-line:variable-name
  public user: any;

  public constructor(tokens: ITokens) {
    this.client = new TwitterClient(tokens);
    this.order = tokens.order;
  }

  public async fetch(): Promise<void> {
    this.user = await this.client.verifyCredentials();
  }
}
