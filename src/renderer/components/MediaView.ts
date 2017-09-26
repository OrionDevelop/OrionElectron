import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { IMediaEntity } from "../../common/twitter";
import { uuid } from "../../common/utils";
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

  public get index(): number {
    return this.params.index;
  }

  public get sizeFor(): any {
    return {
      "height": "90%",
      "max-height": "90%",
      "max-width": "90%",
      "width": "90%",
    };
  }

  public get justHeight(): string {
    return `${window.innerHeight - 150}px`;
  }

  public get videoSource(): string {
    let url = "";
    if (this.type === "animated_gif") {
      return this.medias[0].video_info.variants[0].url;
    } else if (this.type === "video") {
      let bitrate = 0;
      for (const variant of this.medias[0].video_info.variants) {
        if (variant.bitrate && variant.bitrate > bitrate) {
          bitrate = variant.bitrate;
          url = variant.url;
        }
      }
    }
    return url;
  }

  public get videoStyle(): any {
    const base = {
      "max-height": "100%",
      "max-width": "100%"
    };
    return Object.assign({
      height: `${this.medias[0].sizes.large.h}px`,
      width: `${this.medias[0].sizes.large.w}px`
    }, base);
  }

  public styleFor(media: IMediaEntity): any {
    const style = {};
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
}