import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class CircleImageComponent extends Vue {
  @Prop()
  private source: string;

  @Prop({ default: 32 })
  private height: number;

  @Prop({ default: 32 })
  private width: number;

  public get style(): any {
    return {
      height: `${this.height}px`,
      width: `${this.width}px`
    };
  }
}
