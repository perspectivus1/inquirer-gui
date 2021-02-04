<template>
  <div class="fd-popover">
    <div
      class="fd-popover__control"
      :aria-controls="`${question.name}_popover`"
      aria-expanded="false"
      aria-haspopup="true"
      :id="`${question.name}_control`"
      @click="toggleAll()"
    >
      <div class="fd-input-group fd-input-group--control">
        <input
          type="text"
          class="fd-input fd-input-group__input"
          autocomplete="off"
          id="input"
          @input="onInput"
        />
        <span class="fd-input-group__addon fd-input-group__addon--button">
          <button
            :id="`${question.name}_button`"
            :aria-controls="`${question.name}_popover`"
            aria-expanded="false"
            aria-haspopup="true"
            class="fd-input-group__button fd-button fd-button--transparent"
          >
            <i class="sap-icon--navigation-down-arrow"></i>
          </button>
        </span>
      </div>
    </div>
    <div
      class="fd-popover__body fd-popover__body--no-arrow fd-popover__body--dropdown fd-popover__body--dropdown-fill"
      aria-hidden="true"
      :id="`${question.name}_popover`"
    >
      <div class="fd-popover__wrapper docs-max-height">
        <ul
          aria-label="fruit options"
          class="fd-list fd-list--dropdown fd-list--compact"
          role="listbox"
        >
          <li
            v-for="(item, i) in relevantChoices"
            :key="i"
            role="option"
            tabindex="0"
            class="fd-list__item"
            @click="onClicked(item)"
          >
            <span class="fd-list__title">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionList",
  methods: {
    onClicked(item) {
      let input = this.$el.querySelector("#input");
      if (input) {
        input.value = item.name;
      }

      this.toggleElAttrs(`${this.question.name}_popover`, ["aria-hidden"]);
      this.$emit("answerChanged", this.question.name, item.value);
    },
    onInput(e) {
      this.setElAttr(`${this.question.name}_popover`, "aria-hidden", "false");
      this.filter = e.srcElement.value;
    },
    getAnswerName() {
      const value = this.question.answer;
      const choice = this.question._choices.find((item) => {
        return (item.value === value);
      });
      if (choice) {
        return choice.name;
      }
      return "";
    },
    toggleAll() {
      this.toggleElAttrs(`${this.question.name}_control`, ["aria-expanded"]);
      this.toggleElAttrs(`${this.question.name}_button`, ["aria-expanded"]);
      this.toggleElAttrs(`${this.question.name}_popover`, ["aria-hidden"]);
    },
    toggleElAttrs(id, toggleAttrs) {
      // this doesn't work for web components shadow DOM
      // let ref = document.getElementById(id);
      let ref = this.$el.querySelector(`#${id}`);
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
      let ref = this.$el.querySelector(`#${id}`);
      if (ref && attr && value) {
        ref.setAttribute(attr, value);
      }
    },
  },
  computed: {
    relevantChoices: function() {
      if (this.filter === "") {
        return this.question._choices;
      }

      const response = this.question._choices.filter((item) => {
        return item.name.toLowerCase().includes(this.filter.toLowerCase());
      });
      return response;
    }
  },
  data() {
    return {
      filter: "",
      searchInput: null,
      clickToDisplay: "Click to display the list of options",
    };
  },
  props: {
    question: Object,
  },
  watch: {
    "question.answer": {
      handler: function() {
        this.filter = "";
        if (this.$el) {
          let input = this.$el.querySelector("#input");
          if (input) {
            input.value = this.getAnswerName();
          }
        }
      },
    },
  },
  mounted() {
    let input = this.$el.querySelector("#input");
    if (input) {
      input.value = this.getAnswerName();
    }
  }
};
</script>
