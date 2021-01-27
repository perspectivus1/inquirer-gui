<template>
  <input
    :value="question.answer"
    :type="getInputType(question.type)"
    @input="onInput"
  />
</template>

<script>
import utils from "../utils";

export default {
  name: "QuestionInputNative",
  props: {
    question: Object,
  },
  methods: {
    onInput: utils.debounce(function(val) {
      this.$emit("answerChanged", this.question.name, val.target.value);
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
.v-input {
  margin: 0;
  padding: 0px;
}

.col {
  padding-bottom: 0px;
}
</style>
