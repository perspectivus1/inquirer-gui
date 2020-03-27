import Vue from "vue";
import App from "./App.vue";
// import Form from "@sap-devx/inquirer-gui";
import "@sap-devx/inquirer-gui/dist/form.css";
// For development use local file:
import Form from "../../src/index";

const questions0 = [
  {
    name: "username",
    message: "Username",
    type: "input",
    validate: function (answer) {
      if (answer.length === 0) {
        return "Must enter a username"
      } else {
        return true;
      }
    }
    // guiType: "username"
  },
  {
    name: "password",
    message: "Password",
    type: "password"
  }
];

const questions1 = [
  {
    name: "noType",
  },
  {
    type: "input",
    guiType: "file-browser",
    name: "configFile",
    message: "Config file (vscode)",
    default: "/home/",
    getFilePath: async function (currentPath) {
        return `${currentPath}subdir/`;
    }
  },
  {
    type: "input",
    guiType: "folder-browser",
    name: "folder1",
    message: "Folder 1",
    default: "/home/",
    getPath: async function (currentPath) {
        return `${currentPath}subdir/`;
    }
  },
  {
      type: "input",
      name: "name",
      message: "Your name (frontend)",
      default: "Joe",
      validate: function (input) {
          if (input.length >= 2) {
              return true;
          } else {
              return "Name must be at least 2 characters long";
          }
      }
  },
  {
      type: "input",
      name: "notes",
      message: function (answers) {
          return `Information about ${answers.name}`;
      },
      default: function (answers) {
          return `Information about ${answers.name}`;
      },
      filter: function (input) {
          return `${input}!!!`
      }
  },
  {
      type: "password",
      name: "password",
      message: "A password"
  },
  {
      type: "number",
      name: "number",
      message: "A number",
      default: "0"
  },
  {
      type: "input",
      name: "street address",
      message: "Your address",
      default: "1 Main street",
      when: function (answers) {
          return answers.name !== "Joker";
      },
      validate: function(answer, answers) {
        return (answer.length < 2 ? "Must enter at least 2 characters" : true);
      }
  },
  {
      type: "list",
      name: "country",
      message: "The country where you live",
      choices: ["USA", {name:"Germany"}, "China", "Israel"],
      default: "Germany"
  },
  {
      type: "checkbox",
      name: "citizenship",
      message: "Your citizenship",
      choices: ["USA", {name:"Germany", value:"Germany"}, "China", "Israel"],
      default: ["Germany", "USA"]
  },
  {
      type: "expand",
      name: "agree",
      message: "Do you agree to the conditions?",
      choices: ["Yes", "No", "Maybe"],
      default: "No"
  }
];

const questions2 = [
  {
    type: "list",
    name: "countryCode",
    message: "Your country code",
    choices: [
      { name: "+1", value: 1 },
      "+49",
      { name: "+86", value: 86 },
      { name: "+972", value: 972 }
    ],
    default: 86
  },
  {
    type: "checkbox",
    name: "citizenship",
    message: "Your citizenship",
    choices: [
      { name: "United States of America", value: "USA" },
      "Germany",
      { name: "People's Republic of China", value: "China" },
      "Israel"
    ],
    default: ["Germany"],
    validate: function(input, answers) {
      return (input.length === 0 ? "Must choose at least one country" : true)
    }
   },
  {
    type: "expand",
    name: "agree",
    message: "Do you agree to the conditions?",
    choices: ["Yes", "No", {type: "separator"}, "Maybe"],
    validate: function(input, answers) {
      return (input ? true : "Must choose an answer");
    }
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Are you sure?",
    default: false
  },
  {
    type: "checkbox",
    name: "citizenship2",
    message: "Your citizenship2",
    choices: function (answers) {
      return [
        "USA",
        { type: "separator" },
        "Germany"
      ]
    }
  }
];
const questionsArray = [questions0, questions1, questions2];

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
const options = {};
Vue.use(Form, options);

let vueOptions = {
  render: h => h(App),
  data() {
    return {
      questionsIndex: 0
    }
  },
  methods: {
    prompt(questions, options) {
      this.$children[0].prompt(questions, options);
    }
  },
  mounted() {
    console.log('sample app is mounted');
    this.prompt(questionsArray[0], {style:"submit", submitMessage: "Please login", submitButtonText:"Login"});
  },
};

if (options.vuetify) {
  vueOptions.vuetify = options.vuetify;
} else {
  vueOptions.vuetify = vuetify;
}

export default new Vue(
  vueOptions
).$on('next', function () {
  if (this.questionsIndex < 2) {
    this.questionsIndex++;
    this.prompt(questionsArray[this.questionsIndex]);
  }
}
).$mount('#app');
