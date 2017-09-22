"use strict";

import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";

import { Authentication } from "../common/auth";

if (process.env.NODE_ENV !== "development") {
  (global as any).__static = path.join(__dirname, "/static").replace(/\\/g, "\\\\");
}

let mainWindow: Electron.BrowserWindow | null;
const file = process.env.NODE_ENV === "development" ?
  "http://localhost:9080" :
  `file://${__dirname}/index.html`;

function createWindow() {
  Authentication.verify(() => {
    mainWindow = new BrowserWindow({
      height: 563,
      useContentSize: true,
      width: 1000
    });

    mainWindow.loadURL(file);
    mainWindow.on("closed", () => {
      mainWindow = null;
    });

    mainWindow.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("authentication-request", (event) => {
  if (mainWindow !== null) {
    Authentication.start("twtr", mainWindow, (tokens) => {
      event.sender.send("authentication-finished", tokens);
    });
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
