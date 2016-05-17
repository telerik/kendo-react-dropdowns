---
title: API
page_title: API | Kendo UI DropDownList for React
description: "Configure and customize the Kendo UI DropDownList for React through its API reference."
slug: api_ddl_kendouiforreact
position: 2
---

# DropDownList API

Represents the Kendo UI DropDownList component for React.

## Data

#### data `Array`

Defines the array of data items (objects, strings, or numbers) which represent the DropDownList options.

#### defaultItem `Object|String|Number`

Defines the text or the value of the default empty item.

> The type of `defaultItem` should match the type of the items in the `data` array.

## Values

#### value `String|Number`

Defines the value of the component.

#### textField `String`

The field of the data item that provides the text content of the list items. The widget searches DropDownList options based on this field.

> Do not set the `textField` configuration option if the component is bound to primitive-type data.

#### valueField `String`

The field of the data item that provides the value of the component.

> Do not set the `valueField` configuration option if the component is bound to primitive-type data.

## Features

#### className `String|Object`

Defines the classes of the DropDownList component.

#### delay `Number`

Defines the delay before the search-text submitted by the user is cleared.

#### disabled `Boolean`*(default: false)*

If set, the DropDownList is disabled and does not allow for a user input.

#### filterable `Boolean`*(default: false)*

If set, the DropDownList renders a filter input field. It enables the user to filter the options of the component.

> The default functionality to search between items is automatically disabled if filtration is enabled.

#### height `Number`*(default: 200)*

Defines the height of the list.

#### highlightFirst `Boolean`*(default: true)*

If set to `false`, the first option is automatically highlighted after the items are filtered.

#### ignoreCase `Boolean`*(default: true)*

If set to `false`, a case-sensitive search is performed to find suggestions. By default, the search functionality is case-insensitive.

#### itemRenderer `Function`

Defines a custom function for rendering the list items.

#### valueRenderer `Function`

Defines a custom function for rendering the selected values.

#### tabIndex `Number`

Defines the order in which the component is focused through the `Tab` key.

#### style `Object`

Defines the styles of the DropDownList.

## Events

#### onFilter `Function`

Callback function that fires when the filter input is changed.

#### onChange `Function`

Callback function that fires when the DropDownList value changes.

## State

#### dataItem `Object|String|Number`

The selected data item.

#### focused `Number`

The index of the currently focused item.

#### selected `Number`

The index of the currently selected item.

#### show `Boolean`*(default: false)*

The visibility state of the DropDownList popup.
