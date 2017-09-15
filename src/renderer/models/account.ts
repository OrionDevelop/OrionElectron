import { uuid } from "./utils";

export class Account {
  public readonly client;
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
