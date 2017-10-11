import { IStatus, IUser } from "../../../common/twitter";

export interface IFilter {
  run(status: IStatus, params: IFilterParams): boolean;
}

export interface IFilterParams {
  friends: string[];
  me: IUser;
}
