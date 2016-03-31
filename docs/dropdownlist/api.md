---
title: Client-Side API
page_title: Client-Side API | Kendo UI Slider for React
description: "Configure and customize the Kendo UI Slider for React through its client-side API reference."
slug: api_slider_kendouiforreact
position: 2
---

# Slider Client-Side API

Represents the Kendo UI Slider component for React.

## Buttons

#### buttons `Boolean`*(default: "true")*

Makes the Slider side arrow buttons appear. When set to `false` the buttons are not displayed.

#### decreaseButtonTitle `String`*(default: "Decrease")*

The title of the decrease button of the Slider.

#### increaseButtonTitle `String`*(default: "Increase")*

The title of the increase button of the Slider.

## Steps  

#### max `Number`*(default: 10)*

The maximum value of the Slider. The attribute accepts both integers and floating-point numbers.

#### min `Number`*(default: 0)*

The minimum value of the Slider. The attribute accepts both integers and floating-point numbers.

#### smallStep `Number`*(default: 1)*

The step value of the Slider. The attribute accepts only positive numbers. Can be both integer or a floating number.

#### value `Number`

The current value of the Slider when initially displayed.

## Ticks

#### tickPlacement `String`*(default: "both")*

Denotes the location of the tick marks in the Slider.

The available options are:

* `before`&mdash;Tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
* `after`&mdash;Tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
* `both`&mdash;Tick marks are located on both sides of the track.
* `none`&mdash;Tick marks are not visible. The actual elements are not added to the DOM tree.

#### title `String|Function`

Defines title of the ticks. The default title for each tick is its Slider value. If callback function is used it will accept an argument holding the value of the component and should return a string with the new title.

#### fixedTickwidth `Number`

Sets the width between each two ticks along the track. The value must be set in pixels. If no `fixedTickWidth` is provided the component will automatically adjust the tick width to accommodate the elements within the size of the component.

## Orientation

#### vertical `Boolean`*(default: "false")*

Changes the orientation of the Slider from horizontal to vertical when set to `true`.

## State

#### onChange `Function`

As a stateless component the Slider will fire its `onChange` event handler every time when the value is changed. It should be handled by the parent component.

## Features

### Handle

#### dragHandleTitle `String`

Changes the title attribute of the drag handle, so it can be localized.

### Disabling

#### disabled `Boolean`*(default: "false")*

The component will be disabled when set to `true`.
