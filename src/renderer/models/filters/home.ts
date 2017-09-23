// Orion timeline filter "Home"
import { IStatus } from "../../../common/twitter";
import { IFilter, IFilterParams } from "./IFilter";

export class HomeFilter implements IFilter {
  public run(status: IStatus, params: IFilterParams): boolean {
    if (status.user.following) {
      return true;
    }
    return params.friends.includes(status.user.id || -1);
  }
}
