<template lang="pug">
  el-dialog.trans(:visible="isVisible" :before-close="onClose" :show-close="false" top="5%")
    template(v-if="type === 'photo'")
      el-carousel(:initial-index="index" indicator-position="outside" :autoplay="false" :height="height")
        el-carousel-item(v-for="(media, w) in medias")
          .centering
            img(:src="`${media.media_url_https}:large`" v-bind:style="styleFor(media)")
    template(v-else-if="type === 'video'")
      video(:src="medias[0].video_info.variants[1].url" controls)
</template>

<style lang="scss" scoped>
.centering {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
}

img,
video {
  height: auto;
  object-fit: contain;
  width: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { uuid } from "../../common/utils";
import { IMediaEntity } from "../../common/twitter";
import { IMediaDialogParams } from "../models/parameters";

@Component
export default class MediaViewComponent extends Vue {
  @Getter("mediaDialogParams")
  public params: IMediaDialogParams;

  @Action("switchMediaDialog")
  public switchMediaDialog: (params: IMediaDialogParams) => void;

  public get isVisible(): boolean {
    return this.params.isVisible;
  }

  public get medias(): IMediaEntity[] {
    return this.params.medias;
  }

  public get type(): string {
    if (this.params.medias.length > 0) {
      return this.params.medias[0].type;
    }
    return "";
  }

  public get height(): string {
    let height = 0;
    for (const media of this.medias) {
      if (media.sizes.large.h > height) {
        height = media.sizes.large.h;
        const width = media.sizes.large.w;
        if (width > window.innerWidth * 0.8 && width > height) {
          const ratio = this.aspectRatio(media);
          height = height / ratio[0] * ratio[1];
        }
      }
    }
    if (window.innerHeight * 0.95 - 140 > height) {
      return `${height}px`;
    } else {
      return `${window.innerHeight * 0.95 - 140 - 50}px`;
    }
  }

  public get index(): number {
    return this.params.index;
  }

  public styleFor(media: IMediaEntity): any {
    let style = {};
    if (window.innerHeight * 0.95 - 140 > media.sizes.large.h) {
      style["max-height"] = `${media.sizes.large.h}px`;
    } else {
      style["max-height"] = `${window.innerHeight * 0.95 - 200}px`;
    }
    if (window.innerWidth > media.sizes.large.w) {
      style["max-width"] = `${media.sizes.large.w}px`;
    } else {
      style["max-width"] = "100%";
    }
    return style;
  }

  public onClose(done): void {
    const params = {
      index: 0,
      isVisible: false,
      medias: [],
      nonce: ""
    } as IMediaDialogParams;
    this.switchMediaDialog(params);
  }

  public created(): void {
    window.addEventListener("resize", this.onWindowResize);
  }

  public beforeDestroy(): void {
    window.removeEventListener("resize", this.onWindowResize);
  }

  private onWindowResize() {
    const params = {
      index: this.index,
      isVisible: this.params.isVisible,
      medias: this.medias,
      nonce: uuid()
    } as IMediaDialogParams;
    this.switchMediaDialog(params);
  }

  private aspectRatio(media: IMediaEntity): number[] {
    let width = media.sizes.large.w;
    let height = media.sizes.large.h;
    let ratio = [width, height];
    for (let i = Math.min(width, height); i > 1; i--) {
      if (width % i === 0 && height % i === 0) {
        width = width / i;
        height = height / i;
        ratio[0] = width;
        ratio[1] = height;
      }
    }
    console.log(ratio);
    return ratio;
  }
}
</script>
