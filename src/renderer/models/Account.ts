import { ITokens } from "../../common/ITokens";
import {
  IUser
} from "../../common/twitter";
import { TwitterClient } from "../../common/TwitterClient";
import { uuid } from "../../common/utils";

export class Account {
  public readonly uuid: string;
  public readonly tokens: ITokens;
  public readonly order: number;
  public user: IUser;

  public constructor(tokens: ITokens) {
    this.uuid = uuid();
    this.tokens = tokens;
    this.order = tokens.order;
  }
}
