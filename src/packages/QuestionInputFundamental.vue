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
    onInput: utils.debounce(function(val) {
      this.$emit("answerChanged", this.question.name, val.data);
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
  @import "https://unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css";
</style>
