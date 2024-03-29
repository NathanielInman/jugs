# jugs

[![Build Status](https://github.com/nathanielinman/jugs/workflows/Node.js%20CI/badge.svg)](https://github.com/nathanielinman/jugs/actions)

![Example Program](https://i.imgur.com/E0r4Otw.gif)

App generator **jugs** makes development fun again!

- [Vite.js](https://github.com/vitejs/vite) : *Performant Module bundler with* **tree-shaking**, **hot module reloading** *&* **minification**
- [Babel](https://github.com/babel/babel) : *Transpile modern javascript, formerly called 6to5*
- [Eslint](https://github.com/eslint/eslint) : *Lint your javascript in its modern format*
- [Stylus](https://github.com/stylus/stylus) : *Powerful CSS Preprocessor with a beautiful syntax*
- [Ion-Cloud](https://github.com/ion-cloud/ion-cloud) : *A micro library for animations & game development*

## Table of Contents

* [Changes](#changes)
* [Installation](#installation)
* [File Structure](#file-structure)
* [Notes](#notes)
* [Thanks](#thanks)
* [License](#license)

## Changes

```
09-13-2022:
  Switched Parcel out for vite.js and updated linting rules
02-09-2021:
  Removed slush altogether. Doesn't require another npm module to install
10-22-2019:
  Moved from webpack to Parcel to improve speed and greatly decrease complexity
12-17-2018:
  Webpack now keeps css file separate instead of attached by javascript
  Webpack will now copy files to dist folder and listen to assets automatically
  Simplified file structure even more (/src/app -> /src)
06-05-2018:
  Updated all npm modules to latest versions including webpack
  cleaning of folders is done with webpack instead of npm scripts now
  Using latest `ion-cloud` which is more performant
12-06-2016:
  Webpack now compiles everything, gulp has been removed
  `npm start` will now run everything and compile `dist` folder
  `gulp patch` is possible with `npm` for info: `man npm-version`
  `npm version patch -m "message goes here"`
  Significant performance and accuracy of files improved
01-27-2016:
  Webpack now uses commons bundler for vendor files
  ESLint now ignores vendor files
  gulp bump added `gulp patch` `gulp feature` `gulp release` now supported
11-25-2015:
  Using ESLint instead of JSHint (included settings file as .eslintrc)
  Using Webpack to handle ES2015 modules
  Gulpfile is now ES2015 code
  Removed annoying notification messages
```

## Installation

Simply install this app generator globally:

```
npm i -g jugs
mkdir appName
cd appName
jugs
```

Follow the questions and it will finalize by installing all dependencies for you.
In order to start the app and have it automatically check for code changes and
autoupdate merely run the command:

```
npm start
```

And just like that, you're on the way to making your app!

## File Structure

Javascript files are compiled together based upon their dependencies declared using ES2015 `import` statements. 

```
project
├─dist
│ └─<<────(assets are copied here on compile)
├─ public (images/pdf/other go here)
├─ src
│ ├─ index.styl
│ ├─ index.js
│ └─ Pipeline.js
├─ vite.config.js
├─ package.json
└─ readme.md
```

## Notes

The boilerplate comes setup with the perspective of a video game developer, but
can be easily transitioned into other avenues. Two very basic libraries are included
that I developed : Easel and Ion.

Easel sets up a canvas that will fit the perspective of the window
and automatically adjust in size when the window is resized.

Ion is a particle engine made for canvas 2d context. The library is well-documented.

## Thanks
This boilerplate of mine is just a combination of great tools, all credit goes to
those who actually put in all the hard work to create them.

- [Vite.js][7] has been an instrumental boost in productivity and clean code, allowing the
  the use of the ES2015 module system. Moving from webpack to vite.js greatly decreased
  complexity and made starting projects **so** much easier!
- From css to less to sass to [Stylus][2], it's been a long road with css pre-processors,
  but I finally found one that lets me drop all the redundant syntax and focus more on the
  design. I love my curly brace languages, but personally think that it gets in-between
  me and focusing on what's important when dealing with UX, wireframing or general
  design.
- No more worrying about vendor prefixes! [Autoprefixer][4] has been an instrumental
  improvement to my workflow when it comes to styling. None of that would be possible
  without [PostCSS][3] and all of the benefits it's brought to frontend development.
- If you're still coding without a linter like [ESLint][5], I'm not sure whether to
  give you a high-five for all the hard work or question your dedication for only
  stupidity.
- Dropped Traceur for [Babel][6] (formerly 6to5) because it has more readable compiled
  code as well as a much more versatile transpilation story when it comes to upcoming
  features to javascript. You can gather more specifics on comparisons of the two at
  their website.

# License
 [MIT](/LICENSE)

[1]:https://github.com/pugjs/pug
[2]:https://github.com/learnboost/stylus
[3]:https://github.com/postcss/postcss
[4]:https://github.com/postcss/autoprefixer
[5]:http://eslint.org
[6]:https://github.com/babel/babel
[7]:https://vitejs.dev/
