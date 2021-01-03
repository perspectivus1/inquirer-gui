<template>
  <!-- 
      :value="question.answer"
      @change="onAnswerChanged" -->
  <fieldset class="fd-fieldset">
    <div
      class="fd-form-item"
      v-for="(item, i) in question._choices"
      :key="`item-${i}`"
    >
      <input
        class="fd-checkbox fd-checkbox--compact"
        type="checkbox"
        :checked="question.answer.includes(item.value)"
        :id="`item-${i}`"
      />
      <label
        class="fd-checkbox__label fd-checkbox__label--compact"
        :for="`item-${i}`"
      >
        <span class="fd-checkbox__text">{{ item.name }}</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "QuestionCheckboxFundamental",
  props: {
    question: Object,
  },
  methods: {
    onAnswerChanged(value) {
      this.$emit("answerChanged", this.question.name, value);
    },
  },
};
</script>

<style>
  @import "https://unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css";
</style>
