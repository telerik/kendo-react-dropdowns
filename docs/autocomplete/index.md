---
title: Overview
page_title: Overview | Kendo UI AutoComplete for React
description: "Use the Kendo UI AutoComplete component in a React project."
slug: overview_autocomplete_kendouiforreact
position: 1
---

# AutoComplete Overview

The Kendo UI AutoComplete for React provides suggestions to the user from a previously entered list of options depending on the typed input.

The Kendo UI AutoComplete for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI AutoComplete for React**

//screen to be added - Vasko

*1. Input area | 2. Drop-down button | 3. Drop-down list | 4. Drop-down list item | 5. Current item*

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI AutoComplete for React.

```html-preview

```
```jsx

```

## Configuration

### Features

disabled: PropTypes.bool,
minLength: PropTypes.number,
placeholder: PropTypes.string,
separator: PropTypes.string,
suggest: PropTypes.bool,
tabIndex: React.PropTypes.number,

```html

```
```jsx

```

### Values

value: PropTypes.string,
valueField: PropTypes.string,
valueRenderer: PropTypes.func
itemRenderer: PropTypes.func,

### State

onChange: PropTypes.func,
onFilter: PropTypes.func,

For detailed information on the Kendo UI AutoComplete for React configuration, refer to its [client-side API documentation](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/autocomplete/api.md).

## Keyboard Navigation

//TBD applicable? - Below is the list with the keyboard shortcuts the AutoComplete supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |

## Accessibility

//TBD applicable? - The AutoComplete is WAI ARIA-accessible through the `Tab` key. The `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` properties define the accessibility values when the user drags the handle of the AutoComplete or interacts with the AutoComplete through its buttons.

## Suggested Links

* [Client-Side API Reference for the Kendo UI AutoComplete Component](https://github.com/telerik/kendo-react-dropdowns/blob/master/docs/autocomplete/api.md)
