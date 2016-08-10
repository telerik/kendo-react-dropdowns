---
title: Overview
page_title: Overview | Kendo UI ComboBox for React
description: "Use the Kendo UI ComboBox component in a React project."
slug: overview_combobox_kendouiforreact
position: 1
---

# ComboBox Overview

The Kendo UI ComboBox displays a list of pre-defined options. It allows the user to pick a single value from that list, or to enter a custom value through a keyboard input.

The ComboBox is part of the [kendo-react-dropdowns npm package](https://www.npmjs.com/package/@telerik/kendo-react-dropdowns).

**Figure 1: A template of the ComboBox**

![Template of the Kendo UI ComboBox for React](images/combobox.png)

1. ComboBox interaction states
2. Drop-down **Expand** / **Collapse** button
3. Drop-down list

## Demos

### Default Setup

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: null,
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox onChange={this.handleChange} data={this.state.data} value={this.state.value} />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

## Configuration

### Data

The ComboBox enables you to bind it to an array of both primitives and complex objects. When binding it to an array of objects, specify the [`textField`]({% slug api_combobox_kendouiforreact %}#textfield--string) and [`valueField`]({% slug api_combobox_kendouiforreact %}#valuefield-string) properties.

The example below demonstrates how to bind to an array of primitive data.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: null,
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox data={this.state.data} onChange={this.handleChange} value={this.state.value} />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

The example below demonstrates how to bind to an array of objects.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 }
    ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: null,
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox
                    textField="text"
                    valueField="value"
                    data={this.state.data}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

### Value

To set the value of the ComboBox, use the [`value`]({% slug api_combobox_kendouiforreact %}#value-numberstring) property.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 }
    ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: 3,
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox
                    textField="text"
                    valueField="value"
                    data={this.state.data}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

### Features

#### Apply Custom Item Rendering

To customize the ComboBox items, use the [`itemRenderer`]({% slug api_combobox_kendouiforreact %}#itemrenderer-function) property.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { FirstName: "John", LastName: "Doe", EmployeeID: 1 },
        { FirstName: "Jane", LastName: "Smith", EmployeeID: 2 },
        { FirstName: "Eric", LastName: "Weber", EmployeeID: 3 }
    ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: null,
            data: data
        };

        renderer = function(Employee) {
            return (
                <span style={{ color: "#F00" }}>{Employee.FirstName} {Employee.LastName}</span>
            );
        };
        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox
                    textField="FirstName"
                    valueField="EmployeeID"
                    data={this.state.data}
                    itemRenderer={this.renderer}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

#### Disable the ComboBox

The ComboBox allows you to prevent user input through disabling the component. By default, the ComboBox is enabled and the [`disabled`]({% slug api_combobox_kendouiforreact %}#disabled-booleandefault-false) property is set to `false`. 

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Jack", "Jane", "John", "Jacob", "Jake" ];
    class ComboBoxContainer extends React.Component {
        state = {
            disabled: true,
            value: "John",
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        toggle = () => {
            this.setState({
                disabled: !this.state.disabled
            });
        }

        render() {
            return (
                <div>
                    <button onClick={this.toggle}> Enable/Disable </button> <br/>
                    <KendoReactDropdowns.ComboBox disabled={this.state.disabled} data={this.state.data} onChange={this.handleChange} value={this.state.value} />
                </div>
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

### Events

The ComboBox enables you to subscribe to its events by passing the handlers through the properties of the component. Currently, the ComboBox supports the [`onChange`]({% slug api_combobox_kendouiforreact %}#onchange-function) and [`onFilter`]({% slug api_combobox_kendouiforreact %}#onfilter-function) events.

#### Change

The [`onChange`]({% slug api_combobox_kendouiforreact %}#onchange-function) callback is executed when the ComboBox value changes. The new value is passed as a parameter.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];
    class ComboBoxContainer extends React.Component {
        state = {
            value: null,
            data: data
        };

        handleChange = (value) => {
            this.setState({
                value: value
            });
        }

        render() {
            return (
                <KendoReactDropdowns.ComboBox data={this.state.data} onChange={this.handleChange} value={this.state.value} />
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
);
```

#### Filter

The [`onFilter`]({% slug api_combobox_kendouiforreact %}#onfilter-function) callback is executed each time the filter input changes. The new filter is passed as a parameter.

```html-preview
    <div id="app"></div>
```
```jsx
const data = [
    { text: "Albania", value: "Alb" },
    { text: "Andorra", value: "And" },
    { text: "Armenia", value: "Arm" },
    { text: "Austria", value: "Aus" },
    { text: "Azerbaijan", value: "Aze" },
    { text: "Belarus", value: "Bls" },
    { text: "Belgium", value: "Blg" },
    { text: "Bosnia & Herzegovina", value: "Her" },
    { text: "Bulgaria", value: "Bul" },
    { text: "Croatia", value: "Cro" },
    { text: "Cyprus", value: "Cyp" },
    { text: "Czech Republic", value: "Rep" },
    { text: "Denmark", value: "Den" },
    { text: "Estonia", value: "Est" },
    { text: "Finland", value: "Fin" },
    { text: "France", value: "Fra" },
    { text: "Georgia", value: "Geo" },
    { text: "Germany", value: "Ger" },
    { text: "Greece", value: "Gre" },
    { text: "Hungary", value: "Hun" },
    { text: "Iceland", value: "Ice" },
    { text: "Ireland", value: "Ire" },
    { text: "Italy", value: "Ita" },
    { text: "Kosovo", value: "Kos" },
    { text: "Latvia", value: "Lat" },
    { text: "Liechtenstein", value: "Lie" },
    { text: "Lithuania", value: "Lit" },
    { text: "Luxembourg", value: "Lux" },
    { text: "Macedonia", value: "Mac" },
    { text: "Malta", value: "Mal" },
    { text: "Moldova", value: "Mol" },
    { text: "Monaco", value: "Mon" },
    { text: "Netherlands", value: "Net" },
    { text: "Norway", value: "Nor" },
    { text: "Poland", value: "Pol" },
    { text: "Portugal", value: "Por" },
    { text: "Romania", value: "Rom" },
    { text: "Russia", value: "Rus" },
    { text: "San Marino", value: "Mar" },
    { text: "Serbia", value: "Ser" },
    { text: "Slovenia", value: "Slo" },
    { text: "Spain", value: "Spa" },
    { text: "Sweden", value: "Swe" },
    { text: "Switzerland", value: "Swi" },
    { text: "Turkey", value: "Tur" },
    { text: "Ukraine", value: "Ukr" },
    { text: "United Kingdom", value: "Kin" },
    { text: "Vatican City", value: "VC" }
];
class ComboBoxContainer extends React.Component {
    state = {
        value: null,
        data: data,
        filter: null
    };

    handleFilter = (text) => {
        let result = [];
        if (text) {
            result = data.filter(function(item) {
                return item.text.toLowerCase().startsWith(text.toLowerCase());
            });
        } else {
            result = data;
        }

        this.setState({
            data:result,
            filter: text
        });
    };

    handleChange = (value) => {
        this.setState({
            value: value,
            filter: null
        });
    }

    render() {
        return (
            <KendoReactDropdowns.ComboBox
                textField="text"
                valueField="value"
                placeholder="Select country"
                data={this.state.data}
                filter={this.state.filter}
                onChange={this.handleChange}
                onFilter={this.handleFilter}
                value={this.state.value}
            />
        );
    }
}

ReactDOM.render(
    <ComboBoxContainer />,
    document.getElementById('app')
);
```

For detailed information on the ComboBox configuration, refer to its [API documentation]({% slug api_combobox_kendouiforreact %}).

## Keyboard Navigation

Below is the list of the keyboard shortcuts the ComboBox supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |
| `Upper Arrow`                       | Highlight the previous item.      |
| `Down Arrow`                        | Highlight the next item.          |
| `Enter`                             | Select the highlighted list item. |

## Suggested Links

* [API Reference of the ComboBox]({% slug api_combobox_kendouiforreact %})
