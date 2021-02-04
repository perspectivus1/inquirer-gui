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
* Use [SAP Fundamental Styles](https://sap.github.io/fundamental-styles/) as the basis for rendering all built-in question types. This means we do *not* use Fundamental libraries for React, Vue or Angular.
* Inquirer-gui gui types ([Inquirer GUI plugins](https://github.com/SAP/inquirer-gui/blob/master/PLUGINS.md)) can be used to custom render form controls.

## Open issues
The problem with using Fundamental Styles is:

Fundamental Styles uses DOM patterns for certain components (e.g. [combobox](https://sap.github.io/fundamental-styles/?path=/docs/patterns-combobox-input--cozy-and-compact)). If that pattern changes, the respective controls for a specific UI Framework would automatically update, but inquirer-gui would have to make the necessary ajustments.

### Loading font files
Font files cannot be loaded from within a web component, so the consuming application must do this (required for check marks inside checkboxes and down arrows in comboboxes).

## Building
```sh
npm run build-wc
```

The web component is placed under `/dist`.

## Running
Open the `sample-web-components/web-component-demo.html` file in a web browser.

To run the sample in dark theme:

Navigate to `sample-web-components/web-component-demo.html#dark`.

## Themes
* We define business themes. E.g. VS Code vs. Fundamental
* And color theme. E.g. Fundamental **Dark** vs. VS Code **Light**
* Inquirer-gui uses Fundamental classes that are defined in the Fundamental Styles css.
* We use css variables to apply a theme, as this is the way we can affect the look of the shadow DOM of a web component from within the consuming application. To apply a theme, the consuming application imports a css that defines the css variables used by Fundamnetal.
* [Article](https://levelup.gitconnected.com/css-variables-and-web-components-7aaae8d4c6ab)
