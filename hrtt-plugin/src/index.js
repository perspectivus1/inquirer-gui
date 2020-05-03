import Vue from "vue";
import QuestionRemoteObjectSelection from "./packages/QuestionRemoteObjectSelection";

export default {
  install(Vue, options) {
    Vue.component('QuestionRemoteObjectSelection', QuestionRemoteObjectSelection);
    if (options) {
      options.plugin = {
        questionType: "remote-object-selection",
        component: QuestionRemoteObjectSelection
      };
    }
  }
}


