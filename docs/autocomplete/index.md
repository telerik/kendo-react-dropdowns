---
title: Overview
page_title: Overview | Kendo UI AutoComplete for React
description: "Use the Kendo UI AutoComplete component in a React project."
slug: overview_autocomplete_kendouiforreact
position: 1
---

# AutoComplete Overview (DRAFT)

The Kendo UI AutoComplete for React provides suggestions to the user from a previously entered list of options depending on the typed input.

The Kendo UI AutoComplete for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI AutoComplete for React**

![Template of the Kendo UI AutoComplete for React](images/autocomplete.png)

1. AutoComplete interaction states
2. Drop-down list

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI AutoComplete for React.

```html-preview

```
```jsx

```

## Configuration

### Data

The AutoComplete enables you to bind data of a complex (objects) or a primitive (strings and numbers) type.

The [`defaultItem`]({% slug api_autocomplete_kendouiforreact %}#defaultitem-objectstringnumber) property type must match the data type. For example, if the [`data`]({% slug api_autocomplete_kendouiforreact %}#data-array) component contains objects, the `defaultItem` must be defined as an object with same [`textField`]({% slug api_autocomplete_kendouiforreact %}#textfield-string) and [`valueField`]({% slug api_autocomplete_kendouiforreact %}#valuefield-string) as the data items.

The example below demonstrates how to bind to an array of primitive data.

```html

```
```jsx

```

The example below demonstrates how to bind to an array of objects.

```html

```
```jsx

```

### Value

The value of the AutoComplete component can be set either through its `value` or `index` property. If both are provided, the `value` takes precedence. When the value changes, the component executes the [`onChange`]({% slug api_autocomplete_kendouiforreact %}#onchange-function) callback function.

```html-preview
```
```jsx
```

### Features

#### Search with Keyboard

By default, the user is able to navigate between items by providing a keyboard input. The default search functionality is case-insensitive and the delay before the search-text submitted by the user is cleared is 500 milliseconds.

```html-preview
```
```jsx
```

#### Filter the Items

If the [`filterable`]({% slug api_autocomplete_kendouiforreact %}#filterable-booleandefault-false) attribute is set, the component renders a filter input field that allowing the user to filter the AutoComplete options. When the user changes the filter input value, the component executes its [`onFilter`]({% slug api_autocomplete_kendouiforreact %}#onfilter-function) callback. It is your responsibility to perform the data filtration and to update the data of the AutoComplete through its props.

> The default functionality to search between items is automatically disabled if filtration is enabled.

```html-preview
```
```jsx
```

#### Disable the AutoComplete

If the [`disabled`]({% slug api_autocomplete_kendouiforreact %}#filterable-booleandefault-false) configuration is set, the AutoComplete is disabled and does not allow for a user input.

```html-preview
```
```jsx
```

#### Apply Custom Render Functions

By default, the widget displays the [`textField`]({% slug api_autocomplete_kendouiforreact %}#textfield-string) of a selected item both in the list and in the header of the AutoComplete. The component enables you to easily overwrite this behavior by applying the [`itemRenderer`]({% slug api_autocomplete_kendouiforreact %}#itemrenderer-function) and [`valueRenderer`]({% slug api_autocomplete_kendouiforreact %}#valuerenderer-function) callbacks.

```html-preview
```
```jsx
```

#### Separate Selected Items

The AutoComplete enables the separation of the list items selected by the end user through the [`separator`]({% slug api_autocomplete_kendouiforreact %}#separator-string) configuration property.

```html-preview
```
```jsx
```

#### Set Number of User Input Characters

The AutoComplete allows you to set the minimum number of characters the end user should type in the input field before any suggestion is displayed. Do this by configuring the [`minLength`]({% slug api_autocomplete_kendouiforreact %}#minlength-number) property.

```html-preview
```
```jsx
```

#### Manage Suggestions

When the [`suggest`]({% slug api_autocomplete_kendouiforreact %}#suggest-boolean) configuration property is set to `true`, the AutoComplete automatically uses the first suggestion as its value.

```html-preview
```
```jsx
```

### Events

#### Select and Change

The [`onSelect`]({% slug api_autocomplete_kendouiforreact %}#onselect-function) callback function is fired when a AutoComplete option is selected.

The [`onChange`]({% slug api_autocomplete_kendouiforreact %}#onchange-function) callback function is fired when the AutoComplete value changes.

```html
```
```jsx
```

#### Filter

The [`onFilter`]({% slug api_autocomplete_kendouiforreact %}#onfilter-function) callback function is fired when the AutoComplete filter input is changed.

```html
```
```jsx
```

For detailed information on the Kendo UI AutoComplete configuration for React, refer to its [API documentation]({% slug api_autocomplete_kendouiforreact %}).

## Keyboard Navigation

Below is the list of the keyboard shortcuts the AutoComplete supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |
| `Upper Arrow` & `Left Arrow` keys   | Highlight the previous item.      |
| `Down Arrow` & `Right Arrow` keys   | Highlight the next item.          |
| `Home`                              | Select the first list item.       |
| `End`                               | Select the last list item.        |
| `Enter`                             | Select the highlighted list item. |
| `ESC`                               | Close the popup.                  |
| `Alt` + `Upper Arrow`               | Close the popup.                  |
| `Alt` + `Down Arrow`                | Open the popup.                   |

## Accessibility

The AutoComplete is WAI ARIA-accessible through the `Tab` key.

## Suggested Links

* [API Reference of the AutoComplete Component]({% slug api_autocomplete_kendouiforreact %})
