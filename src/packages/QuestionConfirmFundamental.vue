<template>
  <div :class="getClass('formgroup')" @change="changed">
    <div :class="getClass('formitem')">
      <input
        type="radio"
        :class="getClass('radio')"
        :name="question.name"
        :id="question.name + '_yes'"
        :checked="question.answer === true"
      />
      <label
        :class="getClass('label')"
        :for="question.name + '_yes'">
        Yes
      </label>
    </div>
    <div :class="getClass('formitem')">
      <input
        type="radio"
        :class="getClass('radio')"
        :name="question.name"
        :id="question.name + '_no'"
        :checked="question.answer === false"
      />
      <label :class="getClass('label')" :for="question.name + '_no'">
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
    getClass(element) {
      switch (this.$root.props.theme) {
        case "fundamental":
          switch (element) {
            case "radio":
              return "fd-radio fd-radio--compact";
            case "label":
              return "fd-radio__label";
            case "formgroup":
              return "fd-form__group";
            case "formitem":
              return "fd-form-item";
            default:
              return "";
          }
        default:
          return "";
      }
    },
    changed(e) {
      var response = (e.target.id.endsWith === "yes" ? true : false);
      this.$emit("answerChanged", this.question.name, response);
    },
  },
};
</script>
