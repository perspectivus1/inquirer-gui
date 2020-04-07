<template>
  <v-file-input @change="onSelectFile"></v-file-input>
</template>

<script>
export default {
  name: "QuestionFileUpload",
  methods: {
    setFilePath() {},
    onSelectFile(file) {
      if (file) {
        const reader = new FileReader();
        const fileName = file.name;
        reader.addEventListener(
          "load",
          () => {
            const fileContents = reader.result;
            this.$emit(
              "customEvent",
              this.question.name,
              "receiveFile",
              this.setFilePath,
              fileName,
              fileContents
            );
          },
          false
        );

        reader.readAsDataURL(file);
      }
    },
    onAnswerChanged(value) {
      this.$emit("answerChanged", this.question.name, value);
    }
  },
  data() {
    return {
      selectedItem: undefined
    };
  },
  props: {
    question: Object
  }
};
</script>

<style scoped>
.v-card.selected {
  border: 1px solid;
}
.v-card__title {
  word-wrap: break-word;
  word-break: normal;
}
a {
  font-size: 11px;
}
.tiles {
  margin: 0px;
}
</style>