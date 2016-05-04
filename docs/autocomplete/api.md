---
title: API
page_title: API | Kendo UI AutoComplete for React
description: "Configure and customize the Kendo UI AutoComplete for React through its API reference."
slug: api_autocomplete_kendouiforreact
position: 2
---

# AutoComplete API (DRAFT)

Represents the Kendo UI AutoComplete component for React.

## Data

#### data `Array`

Defines the array of data items (objects, strings, or numbers) which represents the AutoComplete options.

## Values

#### value `String|Number`

Defines the value of the widget.

#### valueField `String`

The field of the data item that provides the value of the widget.

> Do not set the `valueField` configuration option if the component is bound to primitive-type data.

## Features

#### className `String|Object`

Defines the classes of the AutoComplete component.

#### delay `Number`

Defines the delay before the search-text submitted by the user is cleared.

#### disabled `Boolean`*(default: false)*

If set, the AutoComplete is disabled and does not allow for a user input.

#### height `Number`*(default: 200)*

Defines the height of the list.

#### highlightFirst `Boolean`*(default: true)*

If set to `false`, the first option is automatically highlighted after the items are filtered.

#### itemRenderer `Function`

Defines a custom function for rendering the options.

#### valueRenderer `Function`

Defines a custom function for rendering the selected values.

#### tabIndex `Number`

Defines the order in which the component is focused through the `Tab` key.

#### style `Object`

Defines the styles of the AutoComplete.

#### separator `String`

Separates the values selected by the end user.

#### minLength `Number`

Sets the minimum number of characters the user should type in the input field before any suggestion is displayed.

#### suggest `Boolean`

If set to `true`, the AutoComplete automatically uses the first suggestion as its value.

## Events

#### onFilter `Function`

Callback function that fires when the filter input is changed.

#### onSelect `Function`

Callback function that fires when a AutoComplete option is selected.

#### onChange `Function`

Callback function that fires when the AutoComplete value changes.

## State

#### dataItem `Object|String|Number`

The selected data item.

#### focused `Number`

The index of the currently focused item.

#### selected `Number`

The index of the currently selected item.

#### show `Boolean`*(default: false)*

The visibility state of the AutoComplete popup.
