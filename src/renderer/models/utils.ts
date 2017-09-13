import path from 'path';

export const XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME || abspath('~/.config');
export const ORION_HOME = `${XDG_CONFIG_HOME}/Orion`

export function abspath(p: string): string {
  if (p.startsWith('~')) {
    p = path.join(process.env.HOME || '', p.substring(1));
  }
  return p;
}
