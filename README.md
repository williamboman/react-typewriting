*React component for creating customizable typewriting visualizations*

[![Build Status](https://travis-ci.org/williamboman/react-typewriting.svg?branch=master)](https://travis-ci.org/williamboman/react-typewriting)

## Usage

```tsx
import { Typewriting } from 'react-typewriting'

interface TypewritingRenderArgs {
    currentText: string
    fullCurrentText: string
}

<Typewriting
    strings={[
        'Sign up today!',
        'Receive 20% off on your first purchase!',
    ]}
>
    {({ currentText, fullCurrentText }: TypewritingRenderArgs) => (
        <h1 aria-label={fullCurrentText}>{currentText}</h1>
    )}
</Typewriting>
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

### `children` | `({ currentText: string, fullCurrentText: string }) => ReactNode` | *required*

The child render prop.

- `currentText` holds the latest, sliced, version of the current string
- `fullCurrentText` holds the full value of the current string

### `waitBeforeDeleteMs` | `number` | default: 9000

Amount of milliseconds strings will be fully readable before starting
to delete the string.

### `writeSpeedMs` | `number` or `[number, number]` | default: 100

This prop controls the speed at which the strings are built.

If provided a `number`, this number will be the longest time to wait between writing characters.

If provided a `[number, number]` tuple, a number between these two values will be the longest time to wait between writing characters.

### `deleteSpeedMs` | `number` or `[number, number]`| default: 60

Same as `writeSpeedMs` (see above), but for when deleting characters.

## License

Licensed under the MIT license.

## Authors

**William Boman** <william@redwill.se>
