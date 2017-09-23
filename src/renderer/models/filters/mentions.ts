// Orion timeline filter "Mentions"
import { IStatus } from "../../../common/twitter";
import { IFilter, IFilterParams } from "./IFilter";

export class MentionsFilter implements IFilter {
  public run(status: IStatus, params: IFilterParams): boolean {
    for (const mention of status.entities.user_mentions) {
      if (mention.screen_name === params.me.screen_name) {
        return true;
      }
    }
    return false;
  }
}
