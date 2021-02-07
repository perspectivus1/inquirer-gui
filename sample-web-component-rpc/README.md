# Inquirer-gui as Web Component using WebSocket RPC
In this example, simple web application renders inquirer-gui as a web component. It communicates with a WebSocket server via RPC to retrieve a list of inquirer.js questions and to evaluate question methods (e.g. `evaluate()`).

## Setup
```sh
npm i
```

## Usage
1. Run the WebSocket server:
    ```sh
    node websocket-server/src/index
    ```
2. Build the client (webpack): `npm run build`
1. Open the `dist/index.html` file in a web browser
