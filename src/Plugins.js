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
import QuestionCheckboxFundamental from "./packages/QuestionCheckboxFundamental";
import QuestionConfirmFundamental from "./packages/QuestionConfirmFundamental";

export default {
  registerBuiltinPlugins: function() {
    // register builtin form elements
    Vue.component('QuestionInput', QuestionInput);
    Vue.component('QuestionEditor', QuestionEditor);
    Vue.component('QuestionList', QuestionList);
    Vue.component('QuestionConfirm', QuestionConfirm);
    Vue.component('QuestionCheckbox', QuestionCheckbox);
    Vue.component('QuestionExpand', QuestionExpand);
    Vue.component('QuestionInputFundamental', QuestionInputFundamental);
    Vue.component('QuestionListFundamental', QuestionListFundamental);
    Vue.component('QuestionCheckboxFundamental', QuestionCheckboxFundamental);
    Vue.component('QuestionConfirmFundamental', QuestionConfirmFundamental);
    Vue.component('QuestionInputNative', QuestionInputNative);

    const plugins = [
      {
        questionType: "input",
        component: QuestionInput
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
        questionType: "checkbox-fundamental",
        component: QuestionCheckboxFundamental
      },
      {
        questionType: "confirm-fundamental",
        component: QuestionConfirmFundamental
      },
      {
        questionType: "list-fundamental",
        component: QuestionListFundamental
      },
    ];
    return plugins;
  }
}