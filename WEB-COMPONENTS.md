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
* Create custom question types ([Inquirer GUI plugins](https://github.com/SAP/inquirer-gui/blob/master/PLUGINS.md)) for different target styling requirements.
* Use [SAP Fundamental Styles](https://sap.github.io/fundamental-styles/) to render questions that should match the style of SAP Fundamental applications (rather than using Fundamental libraries for React, Vue or Angular).
