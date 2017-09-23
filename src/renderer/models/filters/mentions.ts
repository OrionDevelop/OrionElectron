// Orion timeline filter "Mentions"
import { IStatus } from "../../../common/twitter";
import { FilterParameters, IFilter } from "./IFilter";

export class MentionsFilter implements IFilter {
  public run(status: IStatus, params: string[]): boolean {
    for (const mention of status.entities.user_mentions) {
      if (mention.screen_name === params[0]) {
        return true;
      }
    }
    return false;
  }

  public get parameters(): FilterParameters[] {
    return [
      FilterParameters.ScreenName
    ];
  }
}
