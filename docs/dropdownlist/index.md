---
title: Overview
page_title: Overview | Kendo UI DropDownList for React
description: "Use the Kendo UI DropDownList component in a React project."
slug: overview_ddl_kendouiforreact
position: 1
---

# DropDownList Overview

The Kendo UI DropDownList for React provides suggestions to the user from a previously entered list of options depending on the typed input.

The Kendo UI DropDownList for React is part of the DropDowns `npm` package of the Kendo UI suite for React.

**Figure 1: A template of the Kendo UI DropDownList for React**

//screen to be added - Vasko

1. Text area
2. Drop-down button
3. Drop-down list
4. Drop-down list item
5. Current item

## Demos

### Default Setup

The example below demonstrates the default setup of a Kendo UI DropDownList for React.

```html-preview

```
```jsx

```

## Configuration

### Data

data: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number
        ]))
        
```html

```
```jsx

``` 

dataItem: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
    ])

```html

```
```jsx

```   

defaultItem: function(props, propName, componentName) {
    if (props.defaultItem && props.valueField && typeof props.defaultItem !== "object") {
        return new Error(`
            ${componentName} invalid configuration.
            DefaultItem type should match the data items type!
            Define the defaultItem as an object with ${props.textField} and ${props.valueField} fields!
        );
    }
}

```html

```
```jsx

```

### Features

className: PropTypes.string

```html

```
```jsx

```

delay: PropTypes.number

```html

```
```jsx

```

disabled: PropTypes.bool

```html

```
```jsx

```

filterable: PropTypes.bool

```html

```
```jsx

```

focused: PropTypes.number

```html

```
```jsx

```

height: PropTypes.number

```html

```
```jsx

```

ignoreCase: PropTypes.bool

```html

```
```jsx

```

selected: PropTypes.number

```html

```
```jsx

```

show: PropTypes.bool 

```html

```
```jsx

```

style: PropTypes.object 

```html

```
```jsx

```

tabIndex: PropTypes.number

```html

```
```jsx

```

textField: PropTypes.string

```html

```
```jsx

```

### Values

itemRenderer: PropTypes.func

```html

```
```jsx

```

valueField: PropTypes.string

```html

```
```jsx

```

valueRenderer: PropTypes.func

```html

```
```jsx

```

### State

onClose: PropTypes.func


onFilter: PropTypes.func

```html

```
```jsx

```

onSelect: PropTypes.func

```html

```
```jsx

```

onToggle: PropTypes.func

```html

```
```jsx

```

For detailed information on the Kendo UI DropDownList for React configuration, refer to its [client-side API documentation]({% slug api_ddl_kendouiforreact %}).

## Keyboard Navigation

Below is the list with the keyboard shortcuts the DropDownList supports.

| SHORTCUT                            | DESCRIPTION         |
|:---                                 |:---                 |

## Accessibility

The DropDownList is WAI ARIA-accessible through the `Tab` key. The `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` properties define the accessibility values when the user drags the handle of the DropDownList or interacts with the DropDownList through its buttons.

## Suggested Links

* [Client-Side API Reference for the Kendo UI DropDownList Component]({% slug api_ddl_kendouiforreact %})
