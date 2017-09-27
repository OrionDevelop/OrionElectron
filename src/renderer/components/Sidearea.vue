<template lang="pug">
  el-menu.sidebar(default-active="1" :collapse="isCollapse")
    el-menu-item(index="1")
      i.el-icon-fa-lg.el-icon-fa-envelope-o
      span(slot="title") New tweet
    el-submenu(index="2")
      template(slot="title")
        i.el-icon-fa-lg.el-icon-fa-list
      el-menu-item-group
        span(slot="title") TIMELINES
        el-menu-item(v-for="(timeline, index) in timelines" :key="timeline.uuid" :index="indexize(index)")
          span {{timeline.name}}
          small {{timeline.hostBy()}}
    .bottom-wrap
      .bottom
        el-menu-item.fix-for-icon(index="2")
          circle-image(:src="icon" :height="36" :width="36")
          span(slot="title") {{username}}
        el-menu-item(index="3")
          i.el-icon-fa-lg.el-icon-fa-gear
          span(slot="title") Settings
</template>

<style lang="scss" src="./Sidearea.scss" scoped></style>
<script lang="ts" src="./Sidearea.ts"></script>
