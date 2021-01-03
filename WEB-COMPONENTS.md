# Web Components

## Requirements
* Inquirer GUI should be consumed from applications using different UI frameworks, namely:
  * Vue applications (e.g. [Yeoman UI](https://github.com/SAP/yeoman-ui) or [Guided Development](https://github.com/SAP/guided-development/))
  * Angular applications (e.g. [DXP](https://github.tools.sap/dxp/docs))
* Inquirer GUI should be styled to match certain experiences, namely:
  * Visual Studio Code (e.g. inside [Business Application Studio](https://help.sap.com/viewer/product/SAP%20Business%20Application%20Studio/Cloud/en-US))
  * [SAP Fundamental Library](https://sap.github.io/fundamental/) (e.g. [DXP](https://github.tools.sap/dxp/docs))

## Problems
* Inquirer GUI is now based on the [Vue](https://vuejs.org/) UI framework. As such it is difficult to consume it from non-Vue applications.
* Inquirer GUI styles are based on [Vuetify](https://vuetifyjs.com/en/). This makes it difficult to adjust the look and feel of Inquirer GUI to different style requirements (e.g. Visual Studo Code vs. SAP Fundamental).

## Solution
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is a set of web technologies that enable the creation of encapsulated reusable custom elements. These capabilities should help us achieve the above requirements.

The specific proposed solution is to:
* Maintain Inquirer GUI as a Vue application.
* Provide Inquirer GUI as a Web Component (see how to [build Vue applications as Web Components](https://cli.vuejs.org/guide/build-targets.html#web-component)).
* Remove dependencies on Vuetify. Note that Vue applications that use [Vuetify cannot be packaged as Web Components](https://github.com/vuetifyjs/vuetify/issues/5054).
* Create custom question gui types ([Inquirer GUI plugins](https://github.com/SAP/inquirer-gui/blob/master/PLUGINS.md)) for different target styling requirements.
* Use [SAP Fundamental Styles](https://sap.github.io/fundamental-styles/) to render questions that should match the style of SAP Fundamental applications (rather than using Fundamental libraries for React, Vue or Angular).

## Open issues
### Style definitions: inquirer-gui vs. consuming application
The proposed solution would lead to multiple gui types per inquirer type. For example, we might end up with two gui types for the inquirer input type: one for vscode and one for Fundamental. A cleaner approach would be for the consuming application to apply the relevant styles on a the inquirer-gui web component.

The problems with this approach is:
1. Fundamental Styles uses classes to change component styles. This means that classes would need to be added to individual elements by the consuming application. This is possible programmatically, but not by simply using stylesheets (see [here](https://stackoverflow.com/questions/15412487/can-i-add-class-with-only-css)).
2. Fundamental Styles uses DOM patterns for certain components (e.g. [combobox](https://sap.github.io/fundamental-styles/?path=/docs/patterns-combobox-input--cozy-and-compact)). This means that the DOM itself would be different when targeting Fundamental styles vs. vs code styles. This would make it impossible for the consuming application to control the styles by simply applying a different stylesheet.

### Loading font files
Fundamental Styles depends on components loading the SAP-icons file. However, this is [not supported in vue.js](https://forum.vuejs.org/t/web-components-fonts-and-material-icons-not-working-font-face/85816/3).

## Building
```sh
npm run build-wc
```

The web component is placed under `/dist`.

## Running
Open the `web-component-demo.html` file in a web browser
