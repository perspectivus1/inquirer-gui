<template>
  <textarea
    :class="getClass('textarea')"
    @input="onInput"
    v-model="question.answer"
  ></textarea>
</template>

<script>
import utils from "../utils";

export default {
  name: "QuestionEditorFundamental",
  props: {
    question: Object,
  },
  methods: {
    getClass(element) {
      switch (this.$root.props.theme) {
        case "fundamental":
          switch (element) {
            case "textarea":
              return "fd-textarea fd-textarea--compact";
            default:
              return "";
          }
        default:
          return "";
      }
    },
    onInput: utils.debounce(function() {
      this.$emit("answerChanged", this.question.name, this.$el.value);
    }, 280),
  },
};
</script>

<style>
@import "./fundamental-styles-0.14.0.css";
</style>
