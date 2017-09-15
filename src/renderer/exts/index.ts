// Extensions for existing classes
// tslint:disable:interface-name
interface NodeRequire {
  context(file: string, flag?: boolean, exp?: RegExp): any;
}

interface IndexerObject {
  [key: string]: any;
}
