import { abspath } from "./utils";

const CREDENTIALS_PATH: string = `${process.env.XDG_CONFIG_HOME || abspath("~/.config")}/orion/credentials.json`;
const TWITTER_CONSUMER_KEY: string = "IUWEAzTZJLcmfB7RFVErvVyLM";
const TWITTER_CONSUMER_SECRET: string = "bgJDN2WfJwzMZUhWK5lVHp8NklqIOKZ6f5ZscrlrzxPz87BbBf";

export {
  CREDENTIALS_PATH,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
};
