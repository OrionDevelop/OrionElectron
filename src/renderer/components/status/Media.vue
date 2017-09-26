<template lang="pug">
  .media(v-if="hasMedia")
    div(:class="style")
      img(:src="thumbnail(media)" :key="index" v-for="(media, index) in medias" @click="show(index)")
</template>
<style lang="scss" src="./Media.scss" scoped></style>
<script lang="ts" src="./Media.ts"></script>
