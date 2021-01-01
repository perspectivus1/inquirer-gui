import Vue from "vue";
import QuestionInput from "./packages/QuestionInput";
import QuestionEditor from "./packages/QuestionEditor";
import QuestionList from "./packages/QuestionList";
import QuestionConfirm from "./packages/QuestionConfirm";
import QuestionCheckbox from "./packages/QuestionCheckbox";
import QuestionExpand from "./packages/QuestionExpand";
import QuestionInputNative from "./packages/QuestionInputNative";
import QuestionInputFundamental from "./packages/QuestionInputFundamental";
import QuestionListFundamental from "./packages/QuestionListFundamental";

export default {
  registerBuiltinPlugins: function() {
    // register builtin form elements
    Vue.component('QuestionInputNative', QuestionInputNative);
    Vue.component('QuestionInputFundamental', QuestionInputFundamental);
    Vue.component('QuestionInput', QuestionInput);
    Vue.component('QuestionEditor', QuestionEditor);
    Vue.component('QuestionList', QuestionList);
    Vue.component('QuestionListFundamental', QuestionListFundamental);
    Vue.component('QuestionConfirm', QuestionConfirm);
    Vue.component('QuestionCheckbox', QuestionCheckbox);
    Vue.component('QuestionExpand', QuestionExpand);

    const plugins = [
      {
        questionType: "input",
        component: QuestionInput
      },
      {
        questionType: "input-native",
        component: QuestionInputNative
      },
      {
        questionType: "input-fundamental",
        component: QuestionInputFundamental
      },
      {
        questionType: "password",
        component: QuestionInput
      },
      {
        questionType: "number",
        component: QuestionInput
      },
      {
        questionType: "editor",
        component: QuestionEditor
      },
      {
        questionType: "list",
        component: QuestionList
      },
      {
        questionType: "list-fundamental",
        component: QuestionListFundamental
      },
      {
        questionType: "rawlist",
        component: QuestionList
      },
      {
        questionType: "confirm",
        component: QuestionConfirm
      },
      {
        questionType: "checkbox",
        component: QuestionCheckbox
      },
      {
        questionType: "expand",
        component: QuestionExpand
      }
    ];
    return plugins;
  }
}