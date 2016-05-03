---
title: API
page_title: API | Kendo UI ComboBox for React
description: "Configure and customize the Kendo UI ComboBox for React through its API reference."
slug: api_combobox_kendouiforreact
position: 2
---

# ComboBox API

Represents the Kendo UI ComboBox component for React.

## Features

#### disabled `Boolean`*(default: "false")*
The ComboBox allows you to disable it by setting the `disabled` configuration property to `true`. When disabled, the component is visible, but does not function.
```jsx
<KendoReactDropdowns.ComboBox
    disabled
    data={data}
/>
```
#### height `Number` *(default: 200)*
The suggestion popup size can be limited through `height` configuration property by setting the height in pixels.
```jsx
<KendoReactDropdowns.ComboBox
    data={data}
    height={500}
/>
```
#### minLength `Number`
By configuring the `minLength` property, the ComboBox allows you to define a minimum number of characters the user should type in the input field before any suggestion is displayed.
```jsx
<KendoReactDropdowns.ComboBox
    data={data}
    minLength={3}
/>
```
#### placeholder `String`
The hint displayed by the widget when it is empty. Not set by default.
```jsx
<KendoReactDropdowns.ComboBox
    data={countries}
    placeholder="Select country"
/>
```
####suggest: `Boolean`*(default: "false")*
If set to true the ComboBox will automatically use the first suggestion as its value. 
```jsx
<KendoReactDropdowns.ComboBox
	suggest
    data={countries}
/>
```

####textField:  `String` 
The field of the data item that provides the text content of the list items. Should be specified when binding the component to an array of objects.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { FirstName: "John", LastName: "Doe", EmployeeID: 1 },
        { FirstName: "Jane", LastName: "Smith", EmployeeID: 2 },
        { FirstName: "Eric", LastName: "Weber", EmployeeID: 3 }
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
####valueField: `String`  
The field of the data item that provides the value of the component. Should be specified when binding the component to an array of objects.
```html-preview
    <div id="app"></div>
```
```jsx
    const data = [
        { FirstName: "John", LastName: "Doe", EmployeeID: 1 },
        { FirstName: "Jane", LastName: "Smith", EmployeeID: 2 },
        { FirstName: "Eric", LastName: "Weber", EmployeeID: 3 }
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

#### value `Number|String`  
The initial value of the component.

#### itemRenderer `Function`  
A function that is responsible for rendering the list items.

#### onChange `Function`
The  `change` event is triggered when the component's value has changed. The new value is passed to the event handler.
#### onFilter `Function`
The `filter` event is triggered each time the text is changed and the new value is passed to the handler.

