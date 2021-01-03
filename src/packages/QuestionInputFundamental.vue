<template>
  <input
    class="fd-input"
    :value="question.answer"
    :type="getInputType(question.type)"
    @input="onInput"
  />
</template>

<script>
import utils from "../utils";

export default {
  name: "QuestionInputFundamental",
  props: {
    question: Object,
  },
  methods: {
    onInput: utils.debounce(function() {
      this.$emit("answerChanged", this.question.name, this.$el.value);
    }, 280),
    getInputType(questionType) {
      switch (questionType) {
        case "password":
          return "password";
        case "number":
          return "number";
        case "input":
          return "text";
      }
    },
  },
};
</script>

<style>
  @import "./fundamental-styles-0.14.0.css";
</style>
