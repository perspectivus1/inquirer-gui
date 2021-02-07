import { RpcBrowserWebSockets } from "@sap-devx/webview-rpc/out.browser/rpc-browser-ws";
const ws = new WebSocket("ws://127.0.0.1:8081");

const elements = document.getElementsByTagName("inquirer-gui");
const inquirerGUIElement = elements[0];
inquirerGUIElement.addEventListener("answered", (e) => {
    const answers = e.detail[0];
    // const issues = e.details[1];
    console.log("answers", answers);
});

let rpc;
ws.onerror = () => {
    console.error("ws error");
};

ws.onopen = () => {
    rpc = new RpcBrowserWebSockets(ws);
    initRpc();
};

function prompt(questions) {
    for (let question of questions) {
        for (let prop in question) {
            if (question[prop] === "__Function") {
                question[prop] = async (...args) => {
                    const response = await rpc.invoke("evaluateMethod", [
                        question.name,
                        prop,
                        args
                    ]);
                    return response;
                };
            }
        }
    }
    inquirerGUIElement.questions = questions;
}

function initRpc() {
    rpc.registerMethod({
        func: prompt,
        thisArg: this,
        name: "prompt",
    });

    rpc.invoke("onClientIsReady", []);
}
