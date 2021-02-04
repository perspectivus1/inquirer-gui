<template>
  <ul class="fd-list fd-list--selection fd-list--compact" role="list">
    <li
      v-for="(item, i) in question._choices"
      :key="i"
      role="listitem"
      tabindex="0"
      class="fd-list__item"
      :class="getClass(question._choices[i].value)"
      @click="onAnswerChanged(question._choices[i].value)"
    >
      <span class="fd-list__title">{{ question._choices[i].name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "QuestionExpand",
  methods: {
    getClass(value) {
      if (value === this.question.answer) {
        return "is-selected";
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
