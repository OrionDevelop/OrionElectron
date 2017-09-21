import { ITokens } from "../../common/ITokens";
import { TwitterClient } from "../../common/TwitterClient";
import { uuid } from "../../common/utils";

export class Account {
  public readonly uuid: string;
  public readonly tokens: ITokens;
  public readonly order: number;
  public user: any;

  public constructor(tokens: ITokens) {
    this.uuid = uuid();
    this.tokens = tokens;
    this.order = tokens.order;
  }
}
