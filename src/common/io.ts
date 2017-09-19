import fs from "fs";
import mkdirp from "mkdirp";
import { dirname } from "path";

export function writeFile(path: string, contents: string): void {
  mkdirp.sync(dirname(path));
  fs.writeFileSync(path, contents);
}

export function readFile(path: string): string {
  if (fs.existsSync(path)) {
    return (new Buffer(fs.readFileSync(path))).toString();
  } else {
    return "";
  }
}
