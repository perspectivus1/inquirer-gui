<template>
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
        @change="onAnswerChanged($event, item.value)"
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
  data: () => {
    return {
      checkedItems: [],
    };
  },
  props: {
    question: Object,
  },
  methods: {
    onAnswerChanged(event, val) {
      if (event.target.checked && !this.checkedItems.includes(val)) {
        this.checkedItems.push(val);
      } else if (!event.target.checked) {
        const index = this.checkedItems.findIndex((value) => {
          return value === val;
        });
        if (index > -1) {
          this.checkedItems.splice(index, 1);
        }
      }

      this.$emit("answerChanged", this.question.name, this.checkedItems);
    },
  },
  watch: {
    "question.answer": {
      handler: function(newValue) {
        this.checkedItems = [...newValue];
      },
      immediate: true,
    },
  },
};
</script>

<style>
  @import "./fundamental-styles-0.14.0.css";
</style>
