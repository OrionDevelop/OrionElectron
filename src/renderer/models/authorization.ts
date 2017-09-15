import { remote } from "electron";
import * as oauth from "oauth";
import * as twitter from "twitter";

import { Account } from "./account";
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from "./constants";

const BrowserWindow = remote.BrowserWindow;

type OAuthCallback = (account: Account) => void;

export class Authorization {
  private static window: Electron.BrowserWindow;

  public constructor(callback: OAuthCallback) {
    const oa = new oauth.OAuth(
      "https://twitter.com/oauth/request_token",
      "https://twitter.com/oauth/access_token",
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      "1.0A",
      null,
      "HMAC-SHA1"
    );
    oa.getOAuthRequestToken(null, (error1, requestToken, requestTokenSecret, _1) => {
      if (error1) {
        const auth = new Authorization(callback);
        return;
      }
      if (Authorization.window) {
        Authorization.window.close();
      }
      Authorization.window = new BrowserWindow({
        height: 600,
        webPreferences: {
          nodeIntegration: false,
        },
        width: 810
      });
      Authorization.window.webContents.on("will-navigate", (event, url) => {
        const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
        if (matched) {
          event.preventDefault();
          oa.getOAuthAccessToken(requestToken, requestTokenSecret, matched[2], (error2, accessToken, accessTokenSecret, _2) => {
            Authorization.window.close();
            if (error2) {
              const auth = new Authorization(callback);
            } else {
              callback(new Account("twtr", accessToken, accessTokenSecret));
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
          const auth = new Authorization(callback);
        }
      });
      Authorization.window.loadURL(`https://twitter.com/oauth/authenticate?oauth_token=${requestToken}&force_login=true`);
    });
  }
}
