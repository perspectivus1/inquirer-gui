<template>
  <div id="app" class="vscode">
    <inquirer-gui
      ref="form"
      :questions.prop="questions"
      @answered="onAnswered"
    />
    <Answers v-if="this.issues === undefined" :answers.prop="answers" />
    <Issues v-if="this.issues !== undefined" :issues.prop="issues" />
    <div>
      <ui5-button :disabled="this.issues !== undefined" @click="onNext"
        >Next</ui5-button
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Answers from "./Answers.vue";
import Issues from "./Issues.vue";

import "@ui5/webcomponents/dist/Button";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import "./inquirer-gui";
import { RpcBrowser } from "@sap-devx/webview-rpc/out.browser/rpc-browser";
import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";
import main from "./main.js";

export default {
  name: "app",
  components: {
    Answers,
    Issues,
    // InquirerGUI
  },
  data() {
    return {
      questions: [],
      issues: {},
      answers: {},
      rpc: {},
    };
  },
  methods: {
    listenToLoadedNodes(nodes) {
      for (const node of nodes) {
        /**
         * We apply the vscode theme after ui5 adds the last style to the DOM.
         * TODO: Change: it is fragile
         */
        if (
          node.nodeName === "STYLE" &&
          node.hasAttribute("data-ui5-system-css-vars")
        ) {
          node.addEventListener("load", () => {
            this.setVscodeTheme();
          });
        }
      }
    },

    initObserver() {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.addedNodes) {
            this.listenToLoadedNodes(mutation.addedNodes);
          }
        }
      });

      observer.observe(window.document.head, { childList: true });
    },

    /**
     * Apply vscode-to-sap css variable mappings
     */
    setVscodeTheme() {
      const head = document.getElementsByTagName("head")[0];
      let cssnode = document.createElement("link");
      cssnode.class = "sapThemeMetaData-Base-baseLib";
      cssnode.type = "text/css";
      cssnode.rel = "stylesheet";
      cssnode.href = "vscode-theme.css";
      head.appendChild(cssnode);
      /**
       * setTheme() seems to not apply --_ui5 css variables,
       * so we listen to last ui5-initiated DOM change,
       * and then apply the vscode theme manually
       */
      // setTheme("vscode");
    },

    onAnswered(answers, issues) {
      this.answers = answers;
      this.issues = issues;
    },
    onNext() {
      main.$emit("next");
    },
    isInVsCode() {
      return typeof acquireVsCodeApi !== "undefined";
    },
    setupRpc() {
      if (this.isInVsCode()) {
        // eslint-disable-next-line
        window.vscode = acquireVsCodeApi();
        this.rpc = new RpcBrowser(window, window.vscode);
        this.initRpc();
      } else {
        const ws = new WebSocket("ws://127.0.0.1:8081");
        ws.onerror = () => {
          // eslint-disable-next-line
          console.error("ws error");
        };
        ws.onopen = () => {
          this.rpc = new RpcBrowserWebSockets(ws);
          this.initRpc();
        };
      }
    },
    prompt(questions) {
      for (let question of questions) {
        for (let prop in question) {
          if (question[prop] === "__Function") {
            var that = this;
            question[prop] = async (...args) => {
              const response = await that.rpc.invoke("evaluateMethod", [
                question.name,
                prop,
                args,
              ]);
              return response;
            };
          }
        }
      }
      this.questions = questions;
    },
    initRpc() {
      const functions = ["prompt"];
      for (let funcName of functions) {
        this.rpc.registerMethod({
          func: this[funcName],
          thisArg: this,
          name: funcName,
        });
      }
      this.rpc.invoke("onClientIsReady", []);
    },
  },
  mounted() {
    // this.setVscodeTheme();
    setTheme("vscode");
    // this.initObserver();

    this.setupRpc();
    const mutationCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          // const isVsCodeLight = mutation.target.classList.contains(
          //   "vscode-light"
          // );
          // if (isVsCodeLight) {
          //   this.$vuetify.theme.light = true;
          // } else {
          //   this.$vuetify.theme.dark = true;
          // }
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    const targetNode = document.getElementsByTagName("body")[0];
    observer.observe(targetNode, { attributes: true });
  },
};
</script>

<style>
.sapThemeMetaData-Base-baseLib {
  background-image: url('data:text/plain;utf-8,{"Path": "map.vscode.css_variables", "PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css", "Extends": ["sap_fiori_3","sap_base_fiori","baseTheme"], "Tags": ["Fiori_3","DarkColorScheme"], "FallbackThemeId": "sap_fiori_3", "Version": { "Build":"11.1.24.20201118150206", "Source": "11.1.24", "Engine": "1.51.0"}}');
}

@font-face {
  font-family: "SAP-icons";
  src: url("./SAP-icons.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@import url("vscode-theme.css");

html,
body {
  height: 100%;
  padding: 0px;
}

.inquirer-gui {
  margin: 8px;
}

.inquirer-gui div.v-input__slot {
  border-radius: 0;
}

.inquirer-gui .v-card.v-card--outlined.v-sheet.theme--light {
  border-radius: 0;
  border-width: medium;
  border-color: black;
}

.inquirer-gui .v-card .v-image__image--cover {
  background-size: contain;
}

div.v-application.theme--light {
  background-color: var(--vscode-editor-background, white);
  color: var(--vscode-editor-foreground, black);
}

/* --vscode-focusBorder */

form.inquirer-gui p.question-label {
  color: var(--vscode-panelTitle-activeForeground, black);
}

form.inquirer-gui
  div.theme--light.v-input.v-input--is-focused
  div.v-input__control {
  border-color: var(--vscode-inputOption-activeBorder, white);
}

form.inquirer-gui div.theme--light.v-input div.v-input__control {
  background-color: var(--vscode-input-background, darkgray);
}

form.inquirer-gui div.theme--light.v-select {
  color: pink;
}
form.inquirer-gui div.theme--light.v-input input,
form.inquirer-gui div.theme--light.v-input textarea {
  color: var(--vscode-input-foreground, white);
}

form.inquirer-gui .error-validation-text {
  color: brown;
}

form.inquirer-gui .mandatory-asterisk {
  color: red;
}
</style>
