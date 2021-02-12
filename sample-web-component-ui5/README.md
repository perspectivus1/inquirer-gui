# Inquirer-gui + UI5 Web Components
UI5 Web Components provides a UI framework-agnostic appoach.

This approach limits the customization of controls to using css variables.

## Setup
```sh
npm i
npm run build
```

## Usage
Open the `dist/index.html` file in a web browser.

## Open Issues
UI5 modifies the DOM: it adds `<style>` elements to the `<head>` element. If we try to load a vscode-to-ui5 mapping css to the DOM before UI5 completes its DOM manipulation, then our mapping has no effect.

UI5 provides a theming mechanism that allows us to load the mapping css programmatically. This handles the timing well; however, it seems that this mechanism applies only css variables that are prefixed with `sap` and disregards css variables that are prefixed with `--_ui5`.

Currently there are several UI5 web components that cannot be rendered as vscode controls without applying `--_ui5` css variables. E.g. In order for a `<ui5-button>` to have square corners, we would like to do this:

```css
  --sapButton_BorderCornerRadius: 0;
```

But must do this instead:
```css
  --_ui5_button_border_radius: 0;
```
