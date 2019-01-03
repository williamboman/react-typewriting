## unreleased

- Add `fullCurrentText` argument to the render prop function signature. `fullCurrentText` holds the full value of the current string.

## v2.1.1 (2018-09-09)

- Exclude __tests__ directory from npm package.
- Fix TS definition exports.

## v2.1.0 (2018-09-09)

- Add tests.
- Refactor some code.

## v2.0.1 (2018-08-27)

- Don't use React fragments to respect React v15 compatibility, as defined in `peerDependencies`.

## v2.0.0 (2018-08-11)

#### Breaking changes

- Use render prop pattern instead of taking `Component` as a prop. Refer to the documentation for updated examples.

#### Other
- Port everything to TypeScript (TS definition file is now provided in the npm package).


## v1.1.0 (2018-08-09)

- Make it possible to pass a number tuple to `writeSpeedMs` and `deleteSpeedMs` for more granular control.
- Add a minimum threshold for randomized timeouts to avoid UI updates that are too adjacent in time.
