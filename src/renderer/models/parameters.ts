import { IMediaEntity } from "../../common/twitter";

export interface IMediaDialogParams {
  index: number;
  isVisible: boolean;
  medias: IMediaEntity[];
  nonce: string;
}
