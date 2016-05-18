---
title: API
page_title: API | Kendo UI ComboBox for React
description: "Configure and customize the Kendo UI ComboBox for React through its API reference."
slug: api_combobox_kendouiforreact
position: 2
---

# ComboBox API
Represents the Kendo UI ComboBox component for React.


## Data
#### data `Array`
Defines the array of data items which represent the ComboBox options.


## Values

#### value `Number|String`
Defines the value of the component.

#### valueField `String`
Defines the field of the data item that provides the value of the component. Specify it when binding the component to an array of objects.

## Features

#### disabled `Boolean`*(default: "false")*
If set to `true`, disables the ComboBox&mdash;the component is visible, but does not function.

#### height `Number` *(default: 200)*
Defines the suggestion popup size and is set in pixels.

#### minLength `Number`
Defines the minimum number of characters the user should type in the input field before any suggestion is displayed.

#### placeholder `String`
Defines the hint displayed by the component when it is empty. By default, it is not set.

#### suggest `Boolean`*(default: "false")*
If set to `true`, the ComboBox automatically uses the first suggestion as its value.

#### textField `String`
Defines the field of the data item which provides the text content of the list items. Specify it when binding the component to an array of objects.

#### itemRenderer `Function`  
Defines a custom function for rendering the list items.


## Events

#### onChange `Function`
Callback function that fires when the ComboBox value changes. The new value is passed to the event handler.

#### onFilter `Function`
Callback function that fires when the filter input is changed. The new value is passed to the event handler.
