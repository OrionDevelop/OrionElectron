import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action } from "vuex-class";

import { IMediaEntity } from "../../../common/twitter";
import { IMediaDialogParams } from "../../models/parameters";

@Component
export default class MediaComponent extends Vue {
  @Prop()
  public medias: IMediaEntity[];

  @Action("switchMediaDialog")
  public switchMediaDialog: (params: IMediaDialogParams) => void;

  public get hasMedia(): boolean {
    return this.medias.length > 0;
  }

  public get style(): string {
    return `media-grid-${this.medias.length}`;
  }

  public thumbnail(media: IMediaEntity): string {
    return `${media.media_url_https}:small`;
  }

  public show(index: number): void {
    const params = {
      index,
      isVisible: true,
      medias: this.medias,
      nonce: ""
    } as IMediaDialogParams;
    this.switchMediaDialog(params);
  }
}
