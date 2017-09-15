import path from "path";

export const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME || abspath("~/.config");
export const ORION_HOME = `${XDG_CONFIG_HOME}/Orion`;

export function abspath(p: string): string {
  if (p.startsWith("~")) {
    p = path.join(process.env.HOME || "", p.substring(1));
  }
  return p;
}

// http://qiita.com/psn/items/d7ac5bdb5b5633bae165
export function uuid(): string {
  const chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
}
