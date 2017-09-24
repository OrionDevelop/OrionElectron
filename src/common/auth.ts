import { BrowserWindow } from "electron";
import * as oauth from "oauth";

import { readFile, writeFile } from "../common/io";
import { ITokens } from "./ITokens";
import { TwitterClient } from "./TwitterClient";

import {
  CREDENTIALS_PATH,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "../common/constants";

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
            nodeIntegration: false,
            sandbox: true
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
              this.register([], { accessToken, accessTokenSecret, order: this.nextOrder() });
              callback({ accessToken, accessTokenSecret, order: this.nextOrder() });
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
    let credentials = this.accounts;
    if (credentials.length === 0) {
      this.start("twtr", null, (tokens) => callback());
    } else {
      const freezed = credentials.filter((w) => true);
      for (const tokens of freezed) {
        try {
          const twitter = new TwitterClient(tokens);
          const _ = await twitter.verifyCredentials();
        } catch (error) {
          credentials = this.unregister(credentials, tokens);
        }
      }
      if (credentials.length === 0) {
        this.start("twtr", null, (tokens) => callback());
      } else {
        callback();
      }
    }
  }

  public static get accounts(): ITokens[] {
    const text = readFile(CREDENTIALS_PATH);
    const credentials = JSON.parse(text === "" ? this.default : text);
    return credentials;
  }

  private static readonly default: string = JSON.stringify([]);
  private static window: Electron.BrowserWindow | null = null;

  private static register(credentials: ITokens[], tokens: ITokens): ITokens[] {
    credentials.push(tokens);
    writeFile(CREDENTIALS_PATH, JSON.stringify(credentials));
    return credentials;
  }

  private static unregister(credentials: ITokens[], tokens: ITokens): ITokens[] {
    credentials = credentials.filter((w) => w.accessToken !== tokens.accessToken);
    writeFile(CREDENTIALS_PATH, JSON.stringify(credentials));
    return credentials;
  }

  private static nextOrder(): number {
    return this.accounts.length + 1;
  }
}
