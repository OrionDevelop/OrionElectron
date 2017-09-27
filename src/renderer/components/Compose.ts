import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class ComposeComponent extends Vue {
  public isVisible: boolean = true;

  public get bodyStyle(): any {
    return {
      "height": "100%",
      "max-height": "calc(100% - 60px)",
      "overflow-y": "auto",
      "padding": "0 10px"
    };
  }
}
