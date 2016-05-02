[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Kendo UI DropDowns for React

* [Overview](https://github.com/telerik/kendo-react-dropdowns#overview)
* [Basic Usage](https://github.com/telerik/kendo-react-dropdowns#basic-usage)
* [Installation](https://github.com/telerik/kendo-react-dropdowns#installation)
* [Browser Support](https://github.com/telerik/kendo-react-dropdowns#browser-support)
* [Glossary](https://github.com/telerik/kendo-react-dropdowns#glossary)
  * [Component](https://github.com/telerik/kendo-react-dropdowns#component)
  * [Package](https://github.com/telerik/kendo-react-dropdowns#package)

## Overview

This repository contains the source code and documentation of the Kendo UI DropDowns components for React.

Currently, the package includes the following components:

* ComboBox
* DropDownList

Telerik works on porting the AutoComplete and MultiSelect components for React too.

For more information on upcoming DropDowns package features and components, refer to the [Roadmap](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/roadmap.md).

## Basic Usage

### Kendo UI ComboBox Component

The ComboBox displays a list of pre-defined options. It allows the user to pick a single value from that list, or to enter a custom value through keyboard input.  

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 },
    ];

    ReactDOM.render(
        <KendoReactDropdowns.ComboBox
            data={data}
            placeholder="Select..."
            textField="text"
            valueField="value"
        />,
        document.getElementById('app')
    );
```

For more examples and available configuration options, refer to the [ComboBox documentation section](https://github.com/telerik/kendo-react-dropdowns/tree/master/docs/combobox/index.md).

### Kendo UI DropDownList Component

The DropDownList displays a list of pre-defined options and allows the user to pick a single value from that list.  

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 },
    ];

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList
            data={data}
            defaultItem={{ text: "Select...", value: null }}
            textField="text"
            valueField="value"
        />,
        document.getElementById('app')
    );
```

For more examples and available configuration options, refer to the [DropDownList documentation section](https://github.com/telerik/kendo-react-dropdowns/tree/master/docs/dropdownlist/index.md).

## Installation

> As of the latest Kendo UI release, the React DropDowns have not been published as a public scoped NPM package yet. The team are working hard on doing so shortly.

## Browser Support

The Kendo UI DropDowns components for React support all browsers that are supported by the React framework&mdash;Internet Explorer 9 and later versions.

## Glossary

Below are explained the basic terms that Kendo UI suite for React applies.

### Component

A Component refers to a [React Component](https://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components).

### Package

A package contains one or more components, developed in a single repository and distributed in a single NPM package. For example, the Kendo UI AutoComplete, ComboBox, and DropDownList components for React are part of the DropDowns Package.
