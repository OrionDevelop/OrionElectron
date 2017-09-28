import { IStatus, IUser } from "./twitter";

type EventType = "blocked" |
  "unblocked" |
  "favorite" |
  "unfavoite" |
  "follow" |
  "unfollow" |
  "mute" |
  "unmute" |
  "user_update" |
  "list_created" |
  "list_destroyed" |
  "list_member_added" |
  "list_member_removed" |
  "list_user_subscribed" |
  "list_user_unsubscribed" |
  "quoted_tweet" |
  "retweeted_retweet" |
  "favorited_retweet" |
  "unknwon_user_event";

export interface IUserEvent {
  event: EventType;
  created_at: string;
  source: IUser;
  target: IUser;
  target_object: IStatus;
}
