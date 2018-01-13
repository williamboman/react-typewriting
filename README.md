*React component for creating highly customizable typewriting visualizations*

[![Build Status](https://travis-ci.org/williamboman/react-typewriting.svg?branch=gh-pages)](https://travis-ci.org/williamboman/react-typewriting/branches)

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

### `writeSpeedMs` | `number` | default: 100

The absolute slowest speed to wait between printing characters (characters are printed at random intervals that span from 0 ms to whatever this config value is set to).

### `deleteSpeedMs` | `number` | default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

### `component` | `Component | Function | string` | default: 'span'

A `Component`, stateless function, or string corresponding to a default JSX element.

### `stringPropName` | `string` | default: 'children'

The prop to pass the current string value to.

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
