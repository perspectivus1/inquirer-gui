<template>
  <fieldset class="fd-fieldset">
    <div
      class="fd-form-item"
      v-for="(item, i) in question._choices"
      :key="`item-${i}`"
    >
      <input
        class="fd-checkbox"
        :class="checkboxSizeClass"
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
  name: "QuestionCheckbox",
  data: () => {
    return {
      checkedItems: [],
      checkboxSizeClass: "fd-checkbox--compact",
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
    appplyCheckboxSize() {
      const style = window.getComputedStyle(window.document.body);
      const checkBoxSize = style.getPropertyValue("--inquirerGuiCheckboxSize");
      switch (checkBoxSize.trim()) {
        case "large":
          this.checkboxSizeClass = "";
          break;
        default:
          this.checkboxSizeClass = "fd-checkbox--compact";
          break;
      }
    },
    listenToLoadedLinks(linkNodes) {
      const loadedCallback = () => {
        this.appplyCheckboxSize();
      };

      for (const linkNode of linkNodes) {
        linkNode.addEventListener("load", loadedCallback);
      }
    },
    initObserver() {
      const targetNode = window.document;

      // Options for the observer (which mutations to observe)
      const config = {
        childList: true,
        subtree: true,
      };

      // Callback function to execute when mutations are observed
      const callback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.addedNodes) {
            this.listenToLoadedLinks(mutation.addedNodes);
          }

          if (mutation.removedNodes) {
            this.appplyCheckboxSize();
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
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
  mounted() {
    const linkNodes = window.document.getElementsByTagName("link");
    this.listenToLoadedLinks(linkNodes);
    this.initObserver();
  },
};
</script>
