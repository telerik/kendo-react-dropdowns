[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A starter repository for Kendo UI React components, which provides the basic directory structure and dependencies.

## Structure

- The `src` directory contains the component source code. All files should be have the `.jsx` extensions so that the build scripts may pick them.
- The `src/bundle.jsx` file should import and re-export all public components of the package. It is used for the `build-cdn` task.
- The `src/index.jsx` is the main entry point for the NPM package (as specified by the `package.json`). The `build-npm-package` transpiles it to `dist/npm/js/index.js`;
- The `src/kendo-component.jsx` file is the actual sample component implementation.
- The `src/util.jsx` is an optional example of an additional file - you may remove it if unnecessary.

- The `examples` directory hosts the demos for the component. As a bare minimum, the component should have a `basic usage` and a `CDN` example.  The `CDN` example should work as expected after the `build-cdn` task has been run.
- The `test` directory contains the component tests. They are transpiled just like the source code itself, and are run with Jasmine in NodeJS.

- The `docs` directory contains markdown files that document the specifics of the component.

## Usage

Follow these steps to build a component called *MyComponent*:

1. Clone this repository via `git clone git@github.com:telerik/kendo-react-component-base.git kendo-react-mycomponent`
1. Get into the directory via `cd kendo-react-mycomponent`
1. Rename the package in `package.json`: `"name": "kendo-react-mycomponent"`
1. Use the package name in `gulpfile.js`: 'kendo-react-mycomponent'
1. Rename the file `src/kendo-component.jsx` to `src/kendo-mycomponent.jsx`
1. In `src/`, `test/` and `examples/`:
   1. Replace all occurrences of `KendoComponent` with `KendoMyComponent`
   1. Replace all occurrences of `kendo-component` with `kendo-mycomponent`
1. Run `npm install`
1. Check that the new component runs with `gulp start`
1. Replace the contents of `README.md` with a nice description of the component

## Gulp tasks

- `build-npm-package` - builds the scripts and styles in `dist/npm` in CommonJS format;
- `build-cdn` - builds the scripts and styles in `dist/cdn` in UMD format.
- `start` - starts the webpack-dev-server (with browsersync in front of it) - suitable for example preview, development and testing.
- `test` - runs the tests with Jasmine in NodeJS.
- `watch-test` - runs the tests in watch mode.
