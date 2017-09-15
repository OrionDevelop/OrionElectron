import { uuid } from './utils';

export class Account {
  public readonly client;
  private _id: string;

  public constructor(private accessToken: string, private accessTokenSecret: string) {
    this._id = uuid();
  }

  get id(): string {
    return this._id;
  }

  public serialize(): string {
    const account = {
      id: this.id,
      access_token: this.accessToken,
      access_token_secret: this.accessTokenSecret
    };
    return JSON.stringify(account);
  }

  public static deserialize(json: string | object): Account {
    let obj: any = {};
    if (typeof json === 'string') {
      obj = JSON.parse(json);
    } else {
      obj = json;
    }
    const account = new Account(obj.access_token, obj.access_token_secret);
    account._id = obj.id;
    return account;
  }
}