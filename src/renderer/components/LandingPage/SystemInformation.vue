<template lang="pug">
  div
    .title Information
    .items
      .item
        .name Path:
        .value {{ path }}
      .item
        .name Route Name:
        .value {{ name }}
      .item
        .name Vue.js:
        .value {{ vue }}
      .item
        .name Electron:
        .value {{ electron }}
      .item
        .name Node:
        .value {{ node }}
      .item
        .name Platform:
        .value {{ platform }}

</template>

<script>
export default {
  data () {
    return {
      electron: process.versions['atom-shell'],
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require('os').platform(),
      vue: require('vue/package.json').version
    }
  }
}
</script>

<style scoped>
.title {
  color: #888;
  font-size: 18px;
  font-weight: initial;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
