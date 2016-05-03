---
title: Overview
page_title: Overview | Kendo UI ComboBox for React
description: "Use the Kendo UI ComboBox component in a React project."
slug: overview_combobox_kendouiforreact
position: 1
---

# ComboBox Overview
The Kendo UI ComboBox for React displays a list of pre-defined options. It allows the user to pick a single value from that list, or to enter a custom value through a keyboard input.

The Kendo UI ComboBox for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI ComboBox for React**

![Template of the Kendo UI ComboBox for React](images/combobox.png)

1. ComboBox interaction states
2. Drop-down **Expand** / **Collapse** button
3. Drop-down list item

## Demos
### Default Setup
The example below demonstrates the default setup of a Kendo UI ComboBox for React.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];

    ReactDOM.render(
		<KendoReactDropdowns.ComboBox data={data} />,
		document.getElementById('app')
    );
```

## Configuration
###Data binding
The ComboBox component can be bound to both array of primitives and array of complex objects. The   [`textField`]() and [`valueField`]() properties should be specified when binding the ComboBox to an array of objects.
####Binding to array of primitives
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [ "Item 1", "Item 2", "Item 3" ];

    ReactDOM.render(
		<KendoReactDropdowns.ComboBox data={data} />,
		document.getElementById('app')
    );
```
####Binding to array of objects
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 }
    ];

    ReactDOM.render(
		<KendoReactDropdowns.ComboBox 
			data={data}
			textField="text"
			valueField="value" 
		/>,
		document.getElementById('app')
    );
```
###Initial value
The component's initial value can be specified through the  [`value`]() property.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 }
    ];

    ReactDOM.render(
		<KendoReactDropdowns.ComboBox 
			data={data}
			textField="text"
			valueField="value"
			value={2} 
		/>,
		document.getElementById('app')
    );
```

## Features
### Custom item rendering
The ComboBox items can be be customized using the  [`itemRenderer`]() property.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { FirstName: "John", LastName: "Doe", EmployeeID: 1 },
        { FirstName: "Jane", LastName: "Smith", EmployeeID: 2 },
        { FirstName: "Eric", LastName: "Weber", EmployeeID: 3 }
    ];

	const customRenderer = function(Employee) {
	    return Employee.FirstName + " " + Employee.LastName;
	};

    ReactDOM.render(
		<KendoReactDropdowns.ComboBox 
			data={data}
			textField="text"
			valueField="value"
			itemRenderer={customRenderer} 
		/>,
		document.getElementById('app')
    );
```

##Event handling
Subscribing to ComboBox events is done by passing the handlers through the component's properties. Currently, the ComboBox supports  [`change`]()  and [`filter`]() events.
### Change event
The  [`change`]() event is triggered when the component's value has changed. The new value is passed to the event handler.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { FirstName: "John", LastName: "Doe", EmployeeID: 1 },
        { FirstName: "Jane", LastName: "Smith", EmployeeID: 2 },
        { FirstName: "Eric", LastName: "Weber", EmployeeID: 3 }
    ];

    const onChange = (value) => {
        console.log("change event triggered: ", value);
    };

    ReactDOM.render(
        <KendoReactDropdowns.ComboBox 
            data={data}
            textField="text"
            valueField="value"
            onChange={onChange} 
        />,
        document.getElementById('app')
    );
```
### Filter event
The [`filter`]() event is triggered each time the text is changed and the new value is passed to the handler.

```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { value: 1, text: "Foo" },
        { value: 2, text: "Bar" },
        { value: 3, text: "Baz" }
    ];

    class ComboBoxContainer extends React.Component {
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
                <KendoReactDropdowns.ComboBox 
                    data={data}
                    value={value}
                    textField="text"
                    valueField="value"
                    onChange={this.onChange}
                    onFilter={this.onFilter}
                />,
            );
        }
    }

    ReactDOM.render(
        <ComboBoxContainer />,
        document.getElementById('app')
    );
```

For detailed information on the Kendo UI ComboBox for React configuration, refer to its [client-side API documentation]({% slug api_combobox_kendouiforreact %}).



## Suggested Links

* [API Reference of the ComboBox Component]({% slug api_combobox_kendouiforreact %})
