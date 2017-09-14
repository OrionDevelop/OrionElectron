/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

import '../../exts';

// const files = require.context('.', false, /\.js$/)
const files = require.context('.', false, /\.(ts|js)$/);
const modules: IndexerObject = {}

files.keys().forEach((key: string) => {
  if (key === './index.ts' || key === './index.js') return
  modules[key.replace(/(\.\/|\.(js|ts))/g, '')] = files(key).default
})

export default modules
