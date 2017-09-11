# Player Statistics Card

A single component brief

## Overview
Although the task is complete and working using standards set out in the brief there a couple of notable points I've run out of time to add:

 - Document code using JSdocs
 - Add pollyfill's for use in IE11
 - Add accessibility features (aria-roles)


## Tooling and technology
For this brief my front end development workflow includes:

- Gulp and NPM task running
- SASS minified and concatenated single CSS with sourcemaps.
- ES6 JavaScript module pattern transpiled,  concatenated and minified to a single file with sourcemaps.
- Local development server startup with livereload.
- CLI `gulp` tasks setup to `watch`, `build` and `serve`.
- Bootstrap v4.0.0-beta (reset and grid only), packages baked into the `styles` gulp task.


## Future features
Beyond the scope of a single component are additional considerations:

- Modular component library
- JavaScript initialising pattern
- Strong CSS architecture
- Workflow automation for:
  - Linting
  - Documentation
  - Commit message formatting
  - Auto-prefixing
  - Image compression
  - Sprite compiling
