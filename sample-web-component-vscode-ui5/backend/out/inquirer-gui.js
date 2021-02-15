"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquirerGui = void 0;
function funcReplacer(key, value) {
    return (typeof value === 'function') ? "__Function" : value;
}
function normalizeFunctions(questions) {
    return JSON.parse(JSON.stringify(questions, funcReplacer));
}
const questions1 = [
    {
        type: "input",
        guiOptions: {
            type: "file-browser"
        },
        name: "configFile",
        message: "Config file (vscode)",
        default: "/home/",
        getFilePath: function (currentPath, showOpenDialog) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield showOpenDialog(currentPath);
            });
        }
    },
    {
        type: "date",
        name: "birthday",
        message: "Birthday"
    },
    {
        type: "input",
        name: "name",
        message: "Your name (backend)",
        default: "Jack",
        validate: function (input) {
            if (input.length >= 2) {
                return true;
            }
            else {
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
            return `${input}!!!`;
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
        }
    },
    {
        type: "list",
        name: "country",
        message: "The country where you live",
        choices: ["USA", "Germany", "China", "Israel"],
        default: "USA"
    },
    {
        type: "checkbox",
        name: "citizenship",
        message: "Your citizenship",
        choices: ["USA", "Germany", "China", "Israel"],
        default: ["Germany"]
    },
    {
        type: "expand",
        name: "agree",
        message: "Do you agree to the conditions?",
        choices: ["Yes", "No", "Maybe"],
        default: "No"
    }
];
class InquirerGui {
    constructor(rpc, showOpenDialogCallback) {
        this.rpc = rpc;
        this.questions = questions1;
        this.rpc = rpc;
        this.showOpenDialog = showOpenDialogCallback;
        this.registerMethods();
    }
    registerMethods() {
        this.rpc.registerMethod({ func: this.evaluateMethod, thisArg: this });
        this.rpc.registerMethod({ func: this.onClientIsReady, thisArg: this });
    }
    evaluateMethod(questionName, methodName, params) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`evaluating method ${questionName}.${methodName}`);
            let relevantQuestion = undefined;
            try {
                for (var _b = __asyncValues(this.questions), _c; _c = yield _b.next(), !_c.done;) {
                    let question = _c.value;
                    if (question.name === questionName) {
                        relevantQuestion = question;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (relevantQuestion !== undefined) {
                // This part is a bit dirty, but the idea is to keep
                // this file clean of references to vscode:
                if (methodName === "getFilePath") {
                    params = [...params, this.showOpenDialog];
                }
                const response = yield relevantQuestion[methodName].apply(this.questions, params);
                console.log(response);
                return response;
            }
            return `${questionName}.${methodName} could not be evaluated on the backend`;
        });
    }
    onClientIsReady() {
        console.log(`client is ready. sending questions`);
        const normalizedQuestions = normalizeFunctions(this.questions);
        this.rpc.invoke('prompt', [normalizedQuestions]);
    }
}
exports.InquirerGui = InquirerGui;
//# sourceMappingURL=inquirer-gui.js.map