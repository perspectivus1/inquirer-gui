import "@ui5/webcomponents/dist/Button";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

// To get buttons with square corners (like in vscode):
initObserver();

// Or to properly use ui5 theming, but to get buttons with rounded corners:
// setVscodeTheme();
// setTheme("vscode");

function listenToLoadedNodes(nodes) {
    for (const node of nodes) {
        /**
         * We apply the vscode theme after ui5 adds the last style to the DOM.
         * TODO: Change: it is fragile
         */
        if (node.nodeName === "STYLE" && node.hasAttribute("data-ui5-system-css-vars")) {
            node.addEventListener("load", () => {
                setVscodeTheme();
            });
        }
    }
}

function initObserver() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes) {
                listenToLoadedNodes(mutation.addedNodes);
            }
        }
    });

    observer.observe(window.document.head, { childList: true });
}

/**
 * Apply vscode-to-sap css variable mappings
 */
function setVscodeTheme() {
    const head = document.getElementsByTagName('head')[0];
    let cssnode = document.createElement('link');
    cssnode.class = "sapThemeMetaData-Base-baseLib";
    cssnode.type = 'text/css';
    cssnode.rel = 'stylesheet';
    cssnode.href = "vscode-theme.css";
    head.appendChild(cssnode);
    /**
     * setTheme() seems to not apply --_ui5 css variables,
     * so we listen to last ui5-initiated DOM change,
     * and then apply the vscode theme manually 
     */
    // setTheme("vscode");
}

/**
 * Create inquirer-gui custom element
 */
const inquirerGui = document.createElement("inquirer-gui");
inquirerGui.addEventListener("answered", (e) => {
    const answers = e.detail[0];
    // const issues = e.details[1];
    console.log("answers", answers);
});
document.body.appendChild(inquirerGui);

function getQuestions() {
    return [
        {
            name: "simpleInput",
            message: "Simple input",
            default: "Text",
            validate: async function (answer, answers) {
                console.log(answer);
            }
        },
        {
            name: "numberInput",
            type: "number",
            message: "A number",
            default: "35",
            validate: async function (answer, answers) {
                console.log(answer);
            }
        },
        {
            name: "passwordInput",
            type: "password",
            message: "A password",
            default: "abcd1234",
            validate: async function (answer, answers) {
                console.log(answer);
            }
        },
        {
            type: "checkbox",
            name: "citizenship",
            message: "Your citizenship",
            choices: ["USA", { name: "Germany", value: "DE" }, "China", "Israel"],
            default: ["DE", "USA"],
        },
        {
            type: "expand",
            name: "expand1",
            message: "A list",
            choices: ["USA", { name: "Germany", value: "DE" }, "China", "Israel"],
            default: "DE",
        },
        {
            type: "confirm",
            name: "confirmation",
            message: "Please confirm",
            default: false,
        },
        {
            name: "editor1",
            type: "editor",
            message: "Multi-line input",
            default: "Text\n2nd line",
            validate: async function (answer, answers) {
                console.log(answer);
            }
        },
        {
            name: "fruit",
            type: "list",
            message: "Select a fruit",
            choices: ["Banana", { name: "Apple", value: "APP" }, "Peach", "Pear"],
            default: "APP",
        }
    ];

}
inquirerGui.questions = getQuestions();

/**
 * Create ui5 web component button
 */
const button = document.createElement("ui5-button");
button.innerText = "Click me";
document.body.appendChild(button);
