---
title: Overview
page_title: Overview | Kendo UI DropDownList for React
description: "Use the Kendo UI DropDownList component in a React project."
slug: overview_ddl_kendouiforreact
position: 1
---

# DropDownList Overview

The Kendo UI DropDownList for React displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options. Use the Kendo UI ComboBox for React component if you want to apply a keyboard input.

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

Kendo UI DropDownList for React supports binding data of complex (object) or primitive (string, number) type.
The `defaultItem` property type must match the data type, e.g. if the component `data` contains objects the `defaultItem` must be defined as an object with same `textField` and `valueField` as the data items.

#### Binding to array of primitive data

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

#### Binding to array of objects

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

The value of the DropDownList component can be set via `value` or `index` property. If both are provided the `value` will take precedence.
When the value changes the component will execute the `onChange` callback function.

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

#### Search with keyboard

By default the user is able to navigate between items by typing with the keyboard. By default the seach is case-insensitive and the delay before the search-text typed by the end user is cleared is 500 milliseconds.

These settings can be changed through the `ignoreCase` and `delay` configuration properties.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Jack", "Jane", "John", "Jacob", "Jake" ];

    ReactDOM.render(
        <div>
            <p>Focus the component and use the keyboard to navigate between items</p>
            <KendoReactDropdowns.DropDownList data={data} delay={1000} ignoreCase={false} index={0} />
        </div>,
        document.getElementById('app')
    );
```

#### Filter the items

If the `filterable` attribute is set the component will render filter input field that allows the user to filter the DropDownList options.
When the user changes the filter input value the component will execute its `onFilter` callback. It is responsibility of the developer to perform the data filtration and update DropDownList's data through the component's props.

> If filtration is enabled the default search between items functionality will be automatically disabled.

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

#### Disabled DropDownList

If set the component will be disabled and will not allow user input.

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

#### Custom item and value render function

By default the widget will display selected item's `textField` both in the list and in the component's header.
This behaviour can be easily overwritten with the `itemRenderer` and `valueRenderer` callbacks.

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

#### Popup open/close

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

#### Select and change

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

For detailed information on the Kendo UI DropDownList for React configuration, refer to its [client-side API documentation]({% slug api_ddl_kendouiforreact %}).

## Keyboard Navigation

Below is the list with the keyboard shortcuts the DropDownList supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |
| `up arrow` or `left arrow`          | Highlights previous item   |
| `down arrow` or `right arrow`       | Highlights next item   |
| `home`                              | Selects the first item from the list   |
| `end`                               | Selects the last item from the list   |
| `enter`                             | Selects the highlighted item   |
| `esc`                               | Closes the popup   |
| `alt` + `up arrow`                  | Closes the popup   |
| `alt` + `down arrow`                | Opens the popup   |

## Accessibility

The DropDownList is WAI ARIA-accessible through the `Tab` key.

## Suggested Links

* [Client-Side API Reference for the Kendo UI DropDownList Component]({% slug api_ddl_kendouiforreact %})
