import { BrowserWindow } from "electron";
import * as oauth from "oauth";
import * as Twitter from "twitter";

import { readFile, writeFile } from "../io";

import {
  CREDENTIALS_PATH,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "../constants";

export interface ITokens {
  accessToken: string;
  accessTokenSecret: string;
}

export class Authentication {
  // Start authentication process for `provider`.
  public static start(provider: string, parent: Electron.BrowserWindow | null, callback: (tokens: ITokens) => void) {
    if (provider !== "twtr") {
      // tslint:disable-next-line:no-console
      console.warn(`[WARN] Not supported provider ${provider}, skip this.`);
      callback({ accessToken: "", accessTokenSecret: "" } as ITokens);
      return;
    }

    const oa = new oauth.OAuth(
      "https://twitter.com/oauth/request_token",
      "https://twitter.com/oauth/access_token",
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      "1.0A",
      null,
      "HMAC-SHA1"
    );
    oa.getOAuthRequestToken(null, (err1, requestToken, requestTokenSecret, _) => {
      if (err1) {
        this.start(provider, parent, callback);
        return;
      }

      if (this.window !== null) {
        this.window.close();
      }

      if (parent === null) {
        this.window = new BrowserWindow({
          height: 600,
          webPreferences: {
            nodeIntegration: false
          },
          width: 810
        });
      } else {
        this.window = new BrowserWindow({
          height: 600,
          modal: true,
          parent,
          webPreferences: {
            nodeIntegration: false
          },
          width: 810
        });
      }
      this.window.webContents.on("will-navigate", (event, url) => {
        const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
        if (matched) {
          event.preventDefault();
          oa.getOAuthAccessToken(requestToken, requestTokenSecret, matched[2], (error2, accessToken, accessTokenSecret, _2) => {
            if (this.window === null) {
              return; // not visited.
            }
            if (error2) {
              this.start(provider, parent, callback);
              return;
            } else {
              this.register({ accessToken, accessTokenSecret });
              callback({ accessToken, accessTokenSecret });
              this.window.close();
            }
          });
        } else if (url.match(/\/account\/login_verification/)) {
          // noop (start of 2FA session)
        } else if (url.match(/\/account\/login_challenge/)) {
          // noop (start of login challenge)
        } else if (url.match(/\/oauth\/authenticate/)) {
          // noop (redirection to successful callback)
        } else {
          event.preventDefault();
          this.start(provider, parent, callback);
        }
      });
      this.window.loadURL(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}&force_login=true`);
      this.window.show();
    });
  }

  // Verify registered account's tokens.
  public static async verify(callback: () => void): Promise<void> {
    const text = readFile(CREDENTIALS_PATH);
    this.credentials = JSON.parse(text === "" ? this.default : text);
    if (this.credentials.length === 0) {
      this.start("twtr", null, (tokens) => callback());
    } else {
      for (const tokens of this.credentials) {
        try {
          const twitter = new Twitter({
            access_token_key: tokens.accessToken,
            access_token_secret: tokens.accessTokenSecret,
            consumer_key: TWITTER_CONSUMER_KEY,
            consumer_secret: TWITTER_CONSUMER_SECRET
          });
          const _ = await twitter.get("account/verify_credentials.json", {});
        } catch (error) {
          this.unregister(tokens);
        }
      }
      if (this.credentials.length === 0) {
        this.start("twtr", null, (tokens) => callback());
      } else {
        callback();
      }
    }
  }

  public static get accounts(): ITokens[] {
    return this.credentials;
  }

  private static default: string = JSON.stringify([]);
  private static credentials: ITokens[] = [];
  private static window: Electron.BrowserWindow | null = null;

  private static register(tokens: ITokens): void {
    this.credentials.push(tokens);
    writeFile(CREDENTIALS_PATH, JSON.stringify(this.credentials));
  }

  private static unregister(tokens: ITokens): void {
    this.credentials = this.credentials.filter((w) => w.accessToken !== tokens.accessToken);
    writeFile(CREDENTIALS_PATH, JSON.stringify(this.credentials));
  }
}
