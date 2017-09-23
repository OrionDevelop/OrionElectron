export interface IBoundingBox {
  coordinates: number[];
  type: string;
}

export interface ICashtagEntity {
  indices: number;
  text: string;
}

export interface ICompatExtendedTweet {
  full_text: string;
  display_text_range: number[];
  entities: IEntities;
  extended_entities: IEntities;
}

export interface IContributors {
  id: number;
  screen_name: string;
}

export interface ICoordinates {
  coordinates: number;
  type: string;
}

export interface IDirectMessage {
  id: number;
  sender: IUser;
  recipient: IUser;
  created_at: string;
  entities: IEntities;
  text: string;
}

export interface IEntities {
  hashtags: IHashtagEntity[];
  media: IMediaEntity[];
  urls: IUrlEntity[];
  user_mentions: IUserMentionEntity[];
  symbols: ICashtagEntity[];
}

export interface IGeoVendorInfo {
  yelp: IVendorYelp;
}

export interface IHashtagEntity {
  indices: number;
  text: string;
}

export interface IMediaEntity {
  display_url: string;
  expanded_url: string;
  id: number;
  indices: number;
  ext_alt_text: string;
  media_url: string;
  media_url_https: string;
  sizes: IMediaSizes;
  source_status_id?: number;
  type: string;
  url: string;
  video_info: IVideoInfo;
}

export interface IMediaSize {
  h: number;
  resize: string;
  w: number;
}

export interface IMediaSizes {
  large: IMediaSize;
  medium: IMediaSize;
  small: IMediaSize;
  thumb: IMediaSize;
}

export interface IPlace {
  attributes: {};
  bounding_box: IBoundingBox;
  centroid: number[];
  contained_within: IPlace[];
  country: string;
  country_code: string;
  full_name: string;
  geometry: ICoordinates;
  id: string;
  name: string;
  place_type: string;
  polylines: string[];
  url: string;
  vendor_info: IGeoVendorInfo;
}

export interface IStatus {
  id: number;
  id_str: string;
  contributors: IContributors[];
  coordinates: ICoordinates;
  created_at: string;
  current_user_retweet: {};
  display_text_range: number[];
  entities: IEntities;
  extended_entities: IEntities;
  extended_tweet: ICompatExtendedTweet;
  favorite_count?: number;
  favorited?: boolean;
  filter_level: string;
  full_text: string;
  in_reply_to_screen_name: string;
  in_reply_to_status_id?: number;
  in_reply_to_user_id?: number;
  is_quoted_status?: boolean;
  lang: string;
  place: IPlace;
  possibly_sensitive?: boolean;
  possibly_sensitive_appealable?: boolean;
  quoted_status_id?: number;
  quoted_status: IStatus;
  scopes: {};
  retweet_count?: number;
  retweeted?: boolean;
  retweeted_status: IStatus;
  source: string;
  text: string;
  truncated?: boolean;
  user: IUser;
  withheld_copyright?: boolean;
  withheld_in_countries: string[];
  withheld_scope: string;
}

export interface IUrlEntity {
  display_url: string;
  expanded_url: string;
  indices: number;
  url: string;
}

export interface IUser {
  contributors_enabled: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  email: string;
  entities: IUserEntities;
  favourites_count: number;
  follow_request_sent?: boolean;
  followers_count: number;
  following: boolean;
  friends_count: number;
  has_extended_profile?: boolean;
  geo_enabled: boolean;
  id?: number;
  is_translator: boolean;
  is_translation_enabled: boolean;
  lang: string;
  listed_count?: number;
  location: string;
  muting?: boolean;
  name: string;
  needs_phone_verification?: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: string;
  profile_banner_url: string;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_link_color: string;
  profile_location: IPlace;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  protected: boolean;
  screen_name: string;
  show_all_inline_media?: boolean;
  status: IStatus;
  statuses_count: number;
  suspended?: boolean;
  time_zone: string;
  translator_type: string;
  url: string;
  utc_offset?: number;
  verified: boolean;
  withheld_in_countries: string[];
  withheld_scope: string;
}

export interface IUserEntities {
  url: IEntities;
  description: IEntities;
}

export interface IUserMentionEntity {
  id?: number;
  indices: number;
  name: string;
  screen_name: string;
}

export interface IVendorYelp {
  business_id: string;
  mobile_url: string;
  url: string;
}

export interface IVideoInfo {
  aspect_ratio: number[];
  duration_millis?: number;
  variants: IVideoVariant[];
}

export interface IVideoVariant {
  bitrate?: number;
  content_type: string;
  url: string;
}
