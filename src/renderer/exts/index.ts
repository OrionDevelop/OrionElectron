// Extensions for existing classes
interface NodeRequire {
  context(file: string, flag?: boolean, exp?: RegExp): any;
}

interface Vue {
  http: any;
  $http: any;
}

interface IndexerObject {
  [key: string]: any;
}
