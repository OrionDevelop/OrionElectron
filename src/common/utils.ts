import path from "path";

// Convert relative path to absolute path.
export function abspath(p: string): string {
  if (p.startsWith("~")) {
    p = path.join(process.env.HOME || process.env.USERPROFILE || "", p.substring(1));
  }
  return p;
}

// Generate UUID.
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

// Convert "Tue Sep 26 15:53:42 +0000 2017" to ISO formatted date.
export function convertToISOFormat(date: string): string {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
  const regex = /\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} (\+|-)\d{4} \d{4}/;
  if (date.match(regex)) {
    const parts = date.split(" ");
    // yyyy-MM-ddTHH:mm:ss
    return `${parts[5]}-${("0" + (month.indexOf(parts[1]) + 1)).slice(-2)}-${parts[2]}T${parts[3]}${parts[4]}`;
  }
  return "";
}

// String.prototype.substr (Emoji)
export function substr(str: string, indexStart: number, indexEnd: number | null = null): string {
  const array = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  return array.slice(indexStart, indexEnd ? indexEnd : undefined).join("");
}
