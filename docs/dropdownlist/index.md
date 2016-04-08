---
title: Overview
page_title: Overview | Kendo UI DropDownList for React
description: "Use the Kendo UI DropDownList component in a React project."
slug: overview_ddl_kendouiforreact
position: 1
---

# DropDownList Overview

The Kendo UI DropDownList for React provides suggestions to the user from a previously entered list of options depending on the typed input.

The Kendo UI DropDownList for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI DropDownList for React**

//screen to be added - Vasko

*1. Text area | 2. Drop-down button | 3. Drop-down list | 4. Drop-down list item | 5. Current item*

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI DropDownList for React.

```html-preview

```
```jsx

```

## Configuration

### Items

dataItem: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ]),
defaultItem: function(props, propName, componentName) {
    if (props.defaultItem && props.valueField && typeof props.defaultItem !== "object") {
        return new Error(`
            ${componentName} invalid configuration.
            DefaultItem type should match the data items type!
            Define the defaultItem as an object with ${props.textField} and ${props.valueField} fields!
        );
    }
},

### Features

delay: PropTypes.number,
disabled: PropTypes.bool,
show: PropTypes.bool,
filterable: PropTypes.bool,
focused: PropTypes.number,
height: PropTypes.number,
ignoreCase: PropTypes.bool,
selected: PropTypes.number,
tabIndex: PropTypes.number,
textField: PropTypes.string,

### Values

itemRenderer: PropTypes.func,
valueField: PropTypes.string,
valueRenderer: PropTypes.func

### State

onFilter: PropTypes.func,
onSelect: PropTypes.func,
onToggle: PropTypes.func,

For detailed information on the Kendo UI DropDownList for React configuration, refer to its [client-side API documentation](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/dropdownlist/api.md).

## Keyboard Navigation

//TBD applicable? - Below is the list with the keyboard shortcuts the DropDownList supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |

## Accessibility

//TBD applcable? - The DropDownList is WAI ARIA-accessible through the `Tab` key. The `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` properties define the accessibility values when the user drags the handle of the DropDownList or interacts with the DropDownList through its buttons.

## Suggested Links

* [Client-Side API Reference for the Kendo UI DropDownList Component](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/dropdownlist/api.md)
