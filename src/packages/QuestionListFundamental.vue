<template>
  <div class="fd-popover">
    <div
      class="fd-popover__control"
      aria-controls="amsfiaufuaskhjd"
      aria-expanded="true"
      aria-haspopup="true"
      id="ansioda7dh"
      onclick="
                    toggleElAttrs('amsfiaufuaskhjd', ['aria-hidden']);
                    toggleElAttrs('ansioda7dh', ['aria-expanded']);
                    toggleElAttrs('ansid87arfgj', ['aria-expanded']);
                "
    >
      <div class="fd-input-group fd-input-group--control">
        <input
          type="text"
          class="fd-input fd-input-group__input"
          id="comboboxAsFormItem"
          placeholder="Select Fruit"
        />
        <span class="fd-input-group__addon fd-input-group__addon--button">
          <button
            id="ansid87arfgj"
            aria-label="show/hide fruit options"
            aria-controls="amsfiaufuaskhjd"
            aria-expanded="true"
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
      aria-hidden="false"
      id="amsfiaufuaskhjd"
    >
      <div class="fd-popover__wrapper docs-max-height">
        <ul
          aria-label="fruit options"
          class="fd-list fd-list--dropdown"
          role="listbox"
        >
          <li role="option" tabindex="0" class="fd-list__item is-selected">
            <span class="fd-list__title">
              <span class="fd-list__bold">App</span>le
            </span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Orange</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Banana</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Kiwi</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Nectarine</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Apricots</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Peache</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Plum</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Mango</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Strawberry</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Blueberry</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Watermelon</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Rockmelon</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Honeydew</span>
          </li>
          <li role="option" tabindex="0" class="fd-list__item">
            <span class="fd-list__title">Apple</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- :value="question.answer"
    @change="onAnswerChanged"
    :items="this.question._choices"
    item-text="name"
    item-value="value"
    hide-details="auto"
    :label="clickToDisplay"
    :append-icon="'mdi-chevron-down'"
    :search-input.sync="searchInput"
-->
</template>

<script>
export default {
  name: "QuestionListFundamental",
  methods: {
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
@import "https://unpkg.com/fundamental-styles@latest/dist/fundamental-styles.css";
</style>
