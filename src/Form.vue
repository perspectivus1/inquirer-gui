<template>
<div>hello world</div>
</template>

<script>
export default {
  name: "form-wc",
  props: {
    questions: Array
  },
  created() {
    // this.plugins = Plugins.registerBuiltinPlugins();
  }
};
</script>

<style>
.inquirer-gui p.question-label {
  margin-top: 0.6rem;
  margin-bottom: 0.05rem;
}

.inquirer-gui .v-text-field div.v-text-field__details {
  margin-bottom: 2px;
}

.inquirer-gui .v-text-field input {
  padding: 0px;
}

.inquirer-gui .v-input--selection-controls {
  margin-top: 0rem;
}

/* mandatory asterisk div */
.mandatory-asterisk {
  padding-left: 4px;
}

/* Error validation text div */
.error-validation-text {
  font-size: 12px;
  padding-left: 12px;
  color: #ff5252;
}

/* Question hint div */
.question-hint {
  padding-left: 4px;
}

</style>
