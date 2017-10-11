import { IStatus } from "../../common/twitter";

export interface IStatuses {
  uuid: string;
  statuses: IStatus[];
}
