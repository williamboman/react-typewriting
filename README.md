*React component for creating customizable typewriting visualizations*

[![Build Status](https://travis-ci.org/williamboman/react-typewriting.svg?branch=master)](https://travis-ci.org/williamboman/react-typewriting)

## Usage

```jsx
import Typewriting from 'react-typewriting'

<Typewriting
    strings={[
        'Sign up today!',
        'Receive 20% off on your first purchase!',
    ]}
/>
```

```jsx
import Typewriting from 'react-typewriting'

function Headline({text}) {
    return <h1>{text}</h1>
}

<Typewriting
    stringPropName='text'
    component={Headline}
    strings={[
        'Lorem ipsum',
        'dolor sit amet',
    ]}
/>
```

## Installation

```sh
$ npm install react-typewriting
# or
$ yarn add react-typewriting
```

## Props

### `strings` | `Array<string>` | *required*

The strings to print out, in order of appearance.

### `waitBeforeDeleteMs` | `number` | default: 9000

Amount of milliseconds strings will be fully readable before starting
to delete the string.

### `writeSpeedMs` | `number` | `[number, number]` | default: 100

This prop controls the speed at which the strings are built.

If provided a `number`, this number will be the longest time to wait between writing characters.

If provided a `[number, number]` tuple, a number between these two values will be the longest time to wait between writing characters.

### `deleteSpeedMs` | `number` | `[number, number]`| default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

### `component` | `Component | Function | string` | default: 'span'

A `Component`, stateless function, or string corresponding to a default JSX element.

### `stringPropName` | `string` | default: 'children'

The prop to pass the current string value to.

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
