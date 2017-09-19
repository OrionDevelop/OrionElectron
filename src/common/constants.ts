import { abspath } from "./utils";

const ROOT_PATH: string = `${process.env.XDG_CONFIG_HOME || abspath("~/.config")}/orion/`;
const CREDENTIALS_PATH: string = `${ROOT_PATH}credentials.json`;
const TIMELINES_PATH: string = `${ROOT_PATH}timelines.json`;
const TWITTER_CONSUMER_KEY: string = "IUWEAzTZJLcmfB7RFVErvVyLM";
const TWITTER_CONSUMER_SECRET: string = "bgJDN2WfJwzMZUhWK5lVHp8NklqIOKZ6f5ZscrlrzxPz87BbBf";

export {
  CREDENTIALS_PATH,
  TIMELINES_PATH,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
};
