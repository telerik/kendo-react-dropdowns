---
title: Overview
page_title: Overview | Kendo UI ComboBox for React
description: "Use the Kendo UI ComboBox component in a React project."
slug: overview_combobox_kendouiforreact
position: 1
---

# ComboBox Overview

The Kendo UI ComboBox for React displays a list of predefined options. It allows the user to pick a single value from that list, or to enter a custom value through keyboard input.

The Kendo UI ComboBox for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI ComboBox for React**

//screen to be added - Vasko

*1. Input area | 2. Drop-down button | 3. Drop-down list | 4. Drop-down list item | 5. Current item*

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI ComboBox for React.

```html-preview

```
```jsx

```

## Configuration

### Features

disabled: React.PropTypes.bool,
height: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
]),
minLength: React.PropTypes.number,
placeholder: React.PropTypes.string,
select: React.PropTypes.func,
separator: React.PropTypes.string,
suggest: React.PropTypes.bool,
tabIndex: React.PropTypes.number,
toggle: React.PropTypes.func,

```html

```
```jsx

```

### Text

text: React.PropTypes.string,
textField: React.PropTypes.string,

### Values

value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
]),
valueField: React.PropTypes.string,
valueUpdate: React.PropTypes.func
itemRenderer: React.PropTypes.func,

### State

onChange: React.PropTypes.func,
onFilter: React.PropTypes.func,

For detailed information on the Kendo UI ComboBox for React configuration, refer to its [client-side API documentation](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/combobox/api.md).

## Keyboard Navigation

//TBD applicable? - Below is the list with the keyboard shortcuts the ComboBox supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |

## Accessibility

//TBD applicable? - The ComboBox is WAI ARIA-accessible through the `Tab` key. The `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` properties define the accessibility values when the user drags the handle of the ComboBox or interacts with the ComboBox through its buttons.

## Suggested Links

* [Client-Side API Reference for the Kendo UI ComboBox Component](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/combobox/api.md)
