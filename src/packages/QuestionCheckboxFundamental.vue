<template>
  <fieldset :class="getClass('fieldset')">
    <div
      :class="getClass('div')"
      v-for="(item, i) in question._choices"
      :key="`item-${i}`"
    >
      <input
        :class="getClass('input')"
        type="checkbox"
        :checked="question.answer.includes(item.value)"
        @change="onAnswerChanged($event, item.value)"
        :id="`item-${i}`"
      />
      <label
        :class="getClass('label')"
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
    getClass(element) {
      switch (this.$root.props.theme) {
        case "fundamental":
          switch (element) {
            case "fieldset":
              return "fd-fieldset";
            case "div":
              return "fd-form-item";
            case "input":
              return "fd-checkbox fd-checkbox--compact";
            case "label":
              return "fd-checkbox__label fd-checkbox__label--compact";
            default:
              return "";
          }
        default:
          return "";
      }
    },
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
