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

Define the array of data items (objects, strings or numbers) which represents the DropDownList options.

#### defaultItem `Object|String|Number`

Define the text/value of the default empty item.

> The type of `defaultItem` should match the type of items in the `data` array.

## Features

#### className `String|Object`

Define component's class(es).

#### delay `Number`

Define the delay in milliseconds before the search-text typed by the end user is cleared.

#### disabled `Boolean`*(default: false)*

If set the component will be disabled and will not allow user input.

#### filterable `Boolean`*(default: false)*

If set the component will render filter input field that allows the user to filter the DropDownList options.

> If filtration is enabled the default search between items functionality will be automatically disabled.

#### height `Number`*(default: 200)*

Define the height of the list.

#### highlightFirst `Boolean`*(default: true)*

If set to false the first option will be automatically highlighted after data is filtered.

#### ignoreCase `Boolean`*(default: true)*

If set to false case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### itemRenderer `Function`

Defines a custom function for rendering the options.

#### valueRenderer `Function`

Defines a custom function for rendering the selected value.

#### tabIndex `Number`

Defines the order in which the component is focused through the Tab key.

#### style `Object`

Defines component's styles.

## Values

#### index `Number`

Defines the index of the initially selected item. The index is **0 based**.

#### value `String|Number`

Defines the value of the widget.

#### textField `String`

The field of the data item that provides the text content of the list items. The widget will search DropDownList options based on this field.

> If the component is bound to data of primitive type the `textField` configuration option should **not** be set.

#### valueField `String`

The field of the data item that provides the value of the widget.

> If the component is bound to data of primitive type the `valueField` configuration option should **not** be set.

## Events

#### onClose `Function`

Callback function that is fired when the component's popup is closed.

#### onFilter `Function`

Callback function that is fired when the filter input is changed.

#### onOpen `Function`

Callback function that is fired when the component's popup is opened.

#### onSelect `Function`

Callback function that is fired when a component's option is selected.

#### onChange `Function`

Callback function that is fired when the component's value changes.

## State

#### dataItem `Object|String|Number`

The selected data item.

#### focused `Number`

The index of the currently focused item.

#### selected `Number`

The index of the currently selected item.

#### show `Boolean`*(default: false)*

The visibility state of the component's popup.
