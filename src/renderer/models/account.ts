import { uuid } from "./utils";

export class Account {
  public readonly client;
  // tslint:disable-next-line:variable-name
  private _id: string;

  public constructor(private accessToken: string, private accessTokenSecret: string) {
    this._id = uuid();
  }

  get id(): string {
    return this._id;
  }
}
