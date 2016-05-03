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

#### defaultItem `Object|String|Number`

Defines the text or the value of the default empty item.

> The type of `defaultItem` should match the type of the items in the `data` array.

## Values

#### index `Number`

Defines the index of the initially selected item. The index is zero-based.

#### value `String|Number`

Defines the value of the widget.

#### textField `String`

The field of the data item that provides the text content of the list items. The widget searches AutoComplete options based on this field.

> Do not set the `textField` configuration option if the component is bound to primitive-type data.

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

#### filterable `Boolean`*(default: false)*

If set, the AutoComplete renders a filter input field. It enables the user to filter the options of the component.

> The default functionality to search between items is automatically disabled if filtration is enabled.

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

## Events

#### onClose `Function`

Callback function that fires when the popup of the AutoComplete is closed.

#### onFilter `Function`

Callback function that fires when the filter input is changed.

#### onOpen `Function`

Callback function that fires when the popup of the AutoComplete is opened.

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
