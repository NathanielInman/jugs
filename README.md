slush-gladius
=================

[![Build Status](https://travis-ci.org/Meesayen/slush-gladius.svg?branch=master)](https://travis-ci.org/Meesayen/slush-gladius) [![dependency Status](https://david-dm.org/Meesayen/slush-gladius/status.svg?style=flat)](https://david-dm.org/Meesayen/slush-gladius) [![devDependency Status](https://david-dm.org/Meesayen/slush-gladius/dev-status.svg?style=flat)](https://david-dm.org/Meesayen/slush-gladius#info=devDependencies)


Slush generator for bleeding edge applications.

It comes with an ES6+ (ES7 async/await are there) to ES3-ish (as IE8 compatible
as possible, but you may have to import polyfills, shims and shams accordingly)
compilation process, together with a Browserify bundling and Uglifyjs compression.

Plus a CSS compilation task, to choose from one of the following:

- LESS
- Sass
- SCSS + Compass
- Myth
- Stylus

as well as an Autoprefixer, post compilation, process (bye bye vendor prefixes).

Also, templates precompilation process, to choose from one of the following:

- Handlebars
- Dust
- Dot.js
- Jade

the task compiles templates in JST format, namespaces them under an `R.templates`
globally accessible variable and serves it to you in the form of a `template.js`
module inside your static scripts folder.

You can also rely on a Karma tests runner, with PhantomJS and Google Chrome
engines (bring your own karma.config.js file, though), plus JSHint code check and
JSValidate safety checks on critical tasks.

It also gives you the possibility to serve your own instance of a Node.js server,
plus watchers and livereloading for, well, everything really.

**Bonus:** version bumping and git tagging/pushing tasks.

*Based on the prebuilt gulp environment [gladius-forge][9].*


Installation + Usage
-------------------

Simply install [slush][10], as well as this generator, globally:

```
npm install -g slush slush-gladius
```

and then run, under an empty folder of your choice, the slush command:

```
slush gladius
```

Follow the instructions and in less than a minute you will have a complete
bleeding edge boilerplate at your hand.

Enjoy.


Notes
---------------------

The boilerplate comes with a very basic set of dependencies installed via NPM.
The remaining modules needed by each task will be lazily installed during the
pre-process phase of each default task.

This way makes it possible to have the smallest amount of dependencies needed to
be installed for the `production` task, that reflects on an massive reduction of
the installation footprint on production environment.


Thanks
---------------------

This boilerplate of mine is just a combination of great tools put together to
achieve higher goals (using cutting edge technologies today, greatly simplifying
a developer's workflow, etc), and if it weren't for the people who built those
tools, I wouldn't have made this little thing so far.

So, thanks goes to:

- [esnext][2] developers and contributors, that are giving us the possibility to use
  ES6 syntax today, in the most lightweight way possible.
- Facebook developers working on the [Regenerator][3] compiler, that are giving ES6
  generators to us, today (also `async` and `await` statements <3).
- The [Gulp][4] developers. Keep up the good work, looking forward for the v4.0.
- People behind [Browserify][5], because CommonJS is the right thing!
- [Karma][6], [JSHint][7] and [gulp-jsvalidate][8] developers, keeping our code safe.
- All the great guys that brought to us those awesome gulp plugins, the list is
  long, so thank you all.


[1]:http://github.com/Meesayen/gladius-draft
[2]:http://github.com/esnext/esnext
[3]:http://github.com/facebook/regenerator
[4]:http://github.com/gulpjs/gulp
[5]:http://github.com/substack/node-browserify
[6]:http://github.com/karma-runner/karma
[7]:http://github.com/jshint/jshint
[8]:http://github.com/sindresorhus/gulp-jsvalidate
[9]:http://github.com/Meesayen/gladius-forge
[10]:http://github.com/slushjs/slush
