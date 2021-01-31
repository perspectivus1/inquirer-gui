<template>
  <div class="fd-form__group" @change="changed">
    <div class="fd-form-item">
      <input
        type="radio"
        class="fd-radio fd-radio--compact"
        :name="question.name"
        :id="question.name + '_yes'"
        :checked="question.answer === true"
      />
      <label class="fd-radio__label" :for="question.name + '_yes'">
        Yes
      </label>
    </div>
    <div class="fd-form-item">
      <input
        type="radio"
        class="fd-radio fd-radio--compact"
        :name="question.name"
        :id="question.name + '_no'"
        :checked="question.answer === false"
      />
      <label class="fd-radio__label" :for="question.name + '_no'">
        No
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionConfirmFundamental",
  props: {
    question: Object,
  },
  methods: {
    changed(e) {
      var response = (e.target.id.endsWith === "yes" ? true : false);
      this.$emit("answerChanged", this.question.name, response);
    },
  },
};
</script>
