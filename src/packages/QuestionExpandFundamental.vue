<template>
  <ul :class="getClass('ul')" role="list">
    <li
      v-for="(item, i) in question._choices"
      :key="i"
      role="listitem"
      tabindex="0"
      :class="getClass('li', question._choices[i].value)"
      @click="onAnswerChanged(question._choices[i].value)"
    >
      <span :class="getClass('text')">{{ question._choices[i].name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "QuestionExpandFundamental",
  methods: {
    getClass(element, value) {
      let response = "";
      switch (this.$root.props.theme) {
        case "fundamental":
          switch (element) {
            case "ul":
              return "fd-list fd-list--selection fd-list--compact";
            case "li":
              response = "fd-list__item";
              if (value === this.question.answer) {
                response = `${response} is-selected`;
              }
              return response;
            case "text":
              return "fd-list__title";
            default:
              return "";
          }
        default:
          return "";
      }
    },
    onAnswerChanged(value) {
      this.$emit("answerChanged", this.question.name, value);
    },
    toggleElAttrs(id, toggleAttrs) {
      let ref = document.getElementById(id);
      if (ref && Array.isArray(toggleAttrs) && toggleAttrs.length) {
        for (var i = 0; i < toggleAttrs.length; i++) {
          var val = ref.getAttribute(toggleAttrs[i]);
          if (val === "true") {
            this.setElAttr(id, toggleAttrs[i], "false");
          } else if (val === "false") {
            this.setElAttr(id, toggleAttrs[i], "true");
          }
        }
      }
    },
    setElAttr(id, attr, value) {
      let ref = document.getElementById(id);
      if (ref && attr && value) {
        ref.setAttribute(attr, value);
      }
    },
  },
  data() {
    return {
      searchInput: null,
      clickToDisplay: "Click to display the list of options",
    };
  },
  props: {
    question: Object,
  },
};
</script>

<style>
@import "./fundamental-styles-0.14.0.css";
</style>
