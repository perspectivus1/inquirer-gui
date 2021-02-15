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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const path = require("path");
const fs = require("fs");
const vscode = require("vscode");
const rpc_extension_1 = require("@sap-devx/webview-rpc/out.ext/rpc-extension");
const inquirer_gui_1 = require("./inquirer-gui");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('inquirerUiExample.show', () => {
        InquirerUIPanel.createOrShow(context.extensionPath);
    }));
    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serializer in activation event
        vscode.window.registerWebviewPanelSerializer(InquirerUIPanel.viewType, {
            deserializeWebviewPanel(webviewPanel, state) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(`Got state: ${state}`);
                    InquirerUIPanel.revive(webviewPanel, context.extensionPath);
                });
            }
        });
    }
}
exports.activate = activate;
/**
 * Manages webview panels
 */
class InquirerUIPanel {
    constructor(panel, extensionPath) {
        this._disposables = [];
        this._panel = panel;
        this._extensionPath = extensionPath;
        this.rpc = new rpc_extension_1.RpcExtension(this._panel.webview);
        this.inquirerGui = new inquirer_gui_1.InquirerGui(this.rpc, showOpenDialog);
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Update the content based on view changes
        this._panel.onDidChangeViewState(e => {
            if (this._panel.visible) {
                this._update();
            }
        }, null, this._disposables);
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, null, this._disposables);
    }
    static createOrShow(extensionPath) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (InquirerUIPanel.currentPanel) {
            InquirerUIPanel.currentPanel._panel.reveal(column);
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(InquirerUIPanel.viewType, 'Inquirer UI Example', column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'dist'))]
        });
        InquirerUIPanel.currentPanel = new InquirerUIPanel(panel, extensionPath);
    }
    static revive(panel, extensionPath) {
        InquirerUIPanel.currentPanel = new InquirerUIPanel(panel, extensionPath);
    }
    doRefactor() {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        this._panel.webview.postMessage({ command: 'refactor' });
    }
    dispose() {
        InquirerUIPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    _update() {
        const webview = this._panel.webview;
        this._panel.title = 'Inquirer UI Example';
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }
    _getHtmlForWebview(webview) {
        // TODO: don't use sync
        let indexHtml = fs.readFileSync(path.join(this._extensionPath, 'dist', 'index.html'), "utf8");
        if (indexHtml) {
            // Local path to main script run in the webview
            const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'dist', path.sep));
            const scriptUri = this._panel.webview.asWebviewUri(scriptPathOnDisk);
            // TODO: very fragile: assuming double quotes and src is first attribute
            // specifically, doesn't work when building vue for development (vue-cli-service build --mode development)
            indexHtml = indexHtml.replace(/<link href=\//g, `<link href=${scriptUri.toString()}`);
            indexHtml = indexHtml.replace(/<script src=\//g, `<script src=${scriptUri.toString()}`);
            indexHtml = indexHtml.replace(/<img src=\//g, `<img src=${scriptUri.toString()}`);
            indexHtml = indexHtml.replace(/url\(\"/g, `url("${scriptUri.toString()}`);
        }
        return indexHtml;
    }
}
InquirerUIPanel.viewType = 'inquirerGuiExample';
function showOpenDialog(currentPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let uri;
        try {
            uri = vscode.Uri.file(currentPath);
        }
        catch (e) {
            uri = vscode.Uri.file('/');
        }
        try {
            let filePath = yield vscode.window.showOpenDialog({
                canSelectFiles: true,
                defaultUri: uri
            });
            return filePath[0].fsPath;
        }
        catch (e) {
            return currentPath;
        }
    });
}
//# sourceMappingURL=extension.js.map