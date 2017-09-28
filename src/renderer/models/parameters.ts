import { IMediaEntity } from "../../common/twitter";
import { Account } from "./Account";

export interface IMediaDialogParams {
  index: number;
  isVisible: boolean;
  medias: IMediaEntity[];
  nonce: string;
}

export interface IStatusUpdateParams {
  account: Account;
  status: string;
}
