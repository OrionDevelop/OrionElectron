import { IStatus } from "../../../common/twitter";

export interface IFilter {
  parameters: FilterParameters[];
  run(status: IStatus, params: string[]): boolean;
}

export enum FilterParameters {
  // Pass timeline owner's screen_name.
  ScreenName
}
