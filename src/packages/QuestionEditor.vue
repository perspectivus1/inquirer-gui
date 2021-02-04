<template>
  <textarea
    class="fd-textarea fd-textarea--compact"
    @input="onInput"
    v-model="question.answer"
  ></textarea>
</template>

<script>
import utils from "../utils";

export default {
  name: "QuestionEditor",
  props: {
    question: Object,
  },
  methods: {
    onInput: utils.debounce(function() {
      this.$emit("answerChanged", this.question.name, this.$el.value);
    }, 280),
  },
};
</script>
