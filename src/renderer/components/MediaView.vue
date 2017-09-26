<template lang="pug">
  el-dialog.trans(:visible="isVisible" :before-close="onClose" custom-class="mediaview-trans" :show-close="true" size="full")
    template(v-if="type === 'photo'")
      .viewer-child
        .centering(@click.self="onClose")
          div(:style="sizeFor" @click.self="onClose")
            el-carousel(:initial-index="index" indicator-position="outside" :autoplay="false" :height="justHeight()")
                el-carousel-item(v-for="(media, w) in medias")
                  .centering
                    img(:src="`${media.media_url_https}:large`" :style="styleFor(media)")
    template(v-else-if="type === 'video' || type === 'animated_gif'")
      .viewer-child
        .centering
          video(:src="videoSource" :style="videoStyle" autoplay controls)
</template>

<style lang="scss" src="./MediaView.scss" scoped></style>
<style lang="scss" src="./MediaView.global.scss"></style>
<script lang="ts" src="./MediaView.ts"></script>
