---
title: Overview
page_title: Overview | Kendo UI DropDownList for React
description: "Use the Kendo UI DropDownList component in a React project."
slug: overview_ddl_kendouiforreact
position: 1
---

# DropDownList Overview

The Kendo UI DropDownList is a React component which displays a list of values and allows for a single value selection from that list. User input is restricted within the predefined options.

To allow for a keyboard input, use the [Kendo UI ComboBox component for React]({% slug overview_combobox_kendouiforreact %}).

The Kendo UI DropDownList for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI DropDownList for React**

![Template of the Kendo UI DropDownList for React](images/dropdownlist.png)

1. DropDownList interaction states
2. Filter input field
3. Grouping header
4. Drop-down list item

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI DropDownList for React.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList data={data} defaultItem="Select..." />,
        document.getElementById('app')
    );
```

## Configuration

### Data

The DropDownList enables you to bind data of a complex (objects) or a primitive (strings and numbers) type.

The [`defaultItem`]({% slug api_ddl_kendouiforreact %}#defaultitem-objectstringnumber) property type must match the data type. For example, if the [`data`]({% slug api_ddl_kendouiforreact %}#data-array) component contains objects, the `defaultItem` must be defined as an object with same [`textField`]({% slug api_ddl_kendouiforreact %}#textfield-string) and [`valueField`]({% slug api_ddl_kendouiforreact %}#valuefield-string) as the data items.

The example below demonstrates how to bind to an array of primitive data.

```html
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList data={data} defaultItem="Select..." />,
        document.getElementById('app')
    );
```

The example below demonstrates how to bind to an array of objects.

```html
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

### Value

The value of the DropDownList component can be set through either through its `value` or `index` property. If both are provided, the `value` takes precedence. When the value changes, the component executes the [`onChange`]({% slug api_ddl_kendouiforreact %}#onchange-function) callback function.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Foo", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Baz", value: 3 },
    ];

    class DropDownListContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: 2
            };
        }

        onChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            const value = this.state.value;

            return (
                <div>
                    <KendoReactDropdowns.DropDownList
                        data={data}
                        defaultItem={{ text: "Select...", value: null }}
                        onChange={this.onChange}
                        textField="text"
                        valueField="value"
                        value={value}
                    />
                    <span>Selected value: <span style={{ color: "#f00" }}>{value}</span></span>
                </div>
            );
        }
    }

    ReactDOM.render(
        <DropDownListContainer />,
        document.getElementById('app')
    );
```

### Features

#### Search with Keyboard

By default, the user is able to navigate between items by providing a keyboard input. The default search functionality is case-insensitive and the delay before the search-text submitted by the user is cleared is 500 milliseconds.

These settings can be changed through the [`ignoreCase`]({% slug api_ddl_kendouiforreact %}#ignorecase-booleandefault-true) and [`delay`]({% slug api_ddl_kendouiforreact %}#delay-number) configuration properties.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Jack", "Jane", "John", "Jacob", "Jake" ];

    ReactDOM.render(
        <div>
            <p>Focus the component and use the keyboard to navigate between items</p>
            <KendoReactDropdowns.DropDownList data={data} delay={1000} index={0} />
        </div>,
        document.getElementById('app')
    );
```

#### Filter the Items

If the [`filterable`]({% slug api_ddl_kendouiforreact %}#filterable-booleandefault-false) attribute is set, the component renders a filter input field that allowing the user to filter the DropDownList options. When the user changes the filter input value, the component executes its [`onFilter`]({% slug api_ddl_kendouiforreact %}#onfilter-function) callback. It is your responsibility to perform the data filtration and to update the data of the DropDownList through its props.

> The default functionality to search between items is automatically disabled if filtration is enabled.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia & Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
    ];

    class DropDownListContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: null,
                data: data
            };
        }

        onChange = (value) => {
            this.setState({
                value: value
            });
        }

        onFilter = (text) => {
            let result;

            if (text) {
                result = data.filter(function(item) {
                    return item.toLowerCase().startsWith(text.toLowerCase());
                });
            } else {
                result = data;
            }

            this.setState({
                data: result
            });
        }

        render() {
            const { data, value } = this.state;

            return (
                <div>
                    <KendoReactDropdowns.DropDownList
                        data={data}
                        filterable
                        onChange={this.onChange}
                        onFilter={this.onFilter}
                        value={value}
                    />
                    <span>Selected value: <span style={{ color: "#f00" }}>{value}</span></span>
                </div>
            );
        }
    }

    ReactDOM.render(
        <DropDownListContainer />,
        document.getElementById('app')
    );
```

#### Disable the DropDownList

If the [`disabled`]({% slug api_ddl_kendouiforreact %}#filterable-booleandefault-false) configuration is set, the DropDownList is disabled and does not allow for a user input.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Jack", "Jane", "John", "Jacob", "Jake" ];

    ReactDOM.render(
        <div>
            <p>Disabled DropDownList</p>
            <KendoReactDropdowns.DropDownList data={data} defaultItem="Select..." disabled />
        </div>,
        document.getElementById('app')
    );
```

#### Apply Custom Render Functions

By default, the widget displays the [`textField`]({% slug api_ddl_kendouiforreact %}#textfield-string) of a selected item both in the list and in the header of the DropDownList. The component enables you to easily overwrite this behavior by applying the [`itemRenderer`]({% slug api_ddl_kendouiforreact %}#itemrenderer-function) and [`valueRenderer`]({% slug api_ddl_kendouiforreact %}#valuerenderer-function) callbacks.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { value: 1, text: "Foo" },
        { value: 2, text: "Bar" },
        { value: 3, text: "Baz" }
    ];

    function renderItem (dataItem) {
        return `Item: ${dataItem.text}`;
    }

    function renderValue (dataItem) {
        return `Value: ${dataItem.value}`;
    }

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList
            data={data}
            itemRenderer={renderItem}
            textField="text"
            valueField="value"
            valueRenderer={renderValue}
        />,
        document.getElementById('app')
    );
```

### Events

#### Open and Close

The [`onOpen`]({% slug api_ddl_kendouiforreact %}#onopen-function) callback function fires when the popup of the DropDownList is opened.

The [`onClose`]({% slug api_ddl_kendouiforreact %}#onclose-function) callback function fires when the popup of the DropDownList is closed.

```html
    <div id="app"></div>
```
```jsx
    const data = [
        { value: 1, text: "Foo" },
        { value: 2, text: "Bar" },
        { value: 3, text: "Baz" }
    ];

    function onOpen(event) {
        console.log("open");
    }

    function onClose(event) {
        console.log("close");
    }

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList
            data={data}
            onClose={onClose}
            onOpen={onOpen}
            textField="text"
            valueField="value"
        />,
        document.getElementById('app')
    );
```

#### Select and Change

The [`onSelect`]({% slug api_ddl_kendouiforreact %}#onselect-function) callback function is fired when a DropDownList option is selected.

The [`onChange`]({% slug api_ddl_kendouiforreact %}#onchange-function) callback function is fired when the DropDownList value changes.

```html
    <div id="app"></div>
```
```jsx
    const data = [
        { value: 1, text: "Foo" },
        { value: 2, text: "Bar" },
        { value: 3, text: "Baz" }
    ];

    function onSelect(value, dataItem) {
        console.log("select");
    }

    function onChange(value, dataItem) {
        console.log("change");
    }

    ReactDOM.render(
        <KendoReactDropdowns.DropDownList
            data={data}
            onSelect={onSelect}
            onChange={onChange}
            textField="text"
            valueField="value"
        />,
        document.getElementById('app')
    );
```

#### Filter

The [`onFilter`]({% slug api_ddl_kendouiforreact %}#onfilter-function) callback function is fired when the DropDownList filter input is changed.

```html
    <div id="app"></div>
```
```jsx
    const data = [
        { value: 1, text: "Foo" },
        { value: 2, text: "Bar" },
        { value: 3, text: "Baz" }
    ];

    class DropDownListContainer extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: null,
                data: data
            };
        }

        onChange = (value) => {
            this.setState({
                value: value
            });
        }

        onFilter = (text) => {
            let result;

            if (text) {
                result = data.filter(function(item) {
                    return item.text.toLowerCase().startsWith(text.toLowerCase());
                });
            } else {
                result = data;
            }

            this.setState({
                data: result
            });
        }

        render() {
            const { data, value } = this.state;

            return (
                <div>
                    <KendoReactDropdowns.DropDownList
                        data={data}
                        filterable
                        onChange={this.onChange}
                        onFilter={this.onFilter}
                        value={value}
                    />
                    <span>Selected value: <span style={{ color: "#f00" }}>{value}</span></span>
                </div>
            );
        }
    }

    ReactDOM.render(
        <DropDownListContainer />,
        document.getElementById('app')
    );
```

For detailed information on the Kendo UI DropDownList configuration for React, refer to its [API documentation]({% slug api_ddl_kendouiforreact %}).

## Keyboard Navigation

Below is the list of the keyboard shortcuts the DropDownList supports.

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

The DropDownList is WAI ARIA-accessible through the `Tab` key.

## Suggested Links

* [API Reference of the DropDownList Component]({% slug api_ddl_kendouiforreact %})
