slush-jugs
=================

[![Build Status](https://travis-ci.org/NathanielInman/slush-jugs.svg?branch=master)](https://travis-ci.org/NathanielInman/slush-jugs) [![dependency Status](https://david-dm.org/NathanielInman/slush-jugs/status.svg?style=flat)](https://david-dm.org/NathanielInman/slush-jugs) [![devDependency Status](https://david-dm.org/NathanielInman/slush-jugs/dev-status.svg?style=flat)](https://david-dm.org/NathanielInman/slush-jugs#info=devDependencies)

Slush generator (J)ade (ug)lify (s)tylus makes game development fun again!

- **Browser Sync** : *Live reloading system*
- **6to5** : *ES6 to ES5 compiler*
- **Jshint** : *Lint your javascript in its ES6 format*
- **Jade** : *Templating system made easy*
- **Stylus** : *Powerful CSS Preprocessor with a beautiful syntax*
  - **Nib** : **[optional]** *Choosing this plugin on init gives you plenty of extensions*
  - **Kouto Swiss** : **[optional]** *Alternative plugin that gives tons of additional features*
- **Uglify** : *Both CSS and JS to make your client payloads small and quick to load*
  - *Doesn't compress vendors folder*
  - *concats all scripts together into two files*
    - **'runtime.min.js'** : *Contains all scripts that compose the application*
    - **'app.min.js'** : *Contains the initialization and execution logic*

Installation + Usage
-------------------

Simply install [slush][2], as well as this generator, globally:

```
npm install -g slush slush-jugs
mkdir appName
cd appName
slush jugs
```

to run...

```
gulp
```

And just like that, you're on the way to making your app!

Notes
---------------------

The boilerplate comes setup with the perspective of a video game developer, but
can be easily transitioned into other avenues. Two very basic libraries are included
that I developed : Easel and Ion.

Easel sets up a canvas that will fit the perspective of the window
and automatically adjust in size when the window is resized. It's an extremely small
library and sets up a few variables that I find very useful:

* **ctx** : *context of the canvas*
* **v.w** : *viewport width in pixels*
* **v.h** : *viewport height in pixels*
* **r(number)** : *returns a decimal between 0 and number*
* **r(number,0,1)** : *returns an integer between 0 and number*
* **r(num1,num2)** : *returns a decimal between num1 and num2*
* **r(num1,num2,1)** : *returns an integer between num1 and num2*
* **Easel.background** : *color to flood the canvas with when it redraws*
* **Easel.redraw()** : *override this function to handle redraws on resize, or call it by hand*

Ion is an extremely lightweight particle engine made for canvas 2d context. The
library is well-documented.

Thanks
---------------------

This boilerplate of mine is just a combination of great tools, all credit goes to
those who actually put in all the hard work to create them.

- The [Gulp][1] developers. Streaming build system, how nice and easy to setup.
- There have been many [Slush][2] generators that have been instrumental in getting
  all those pesky apps developed on time. It's great to finally have an alternative
  to Yeoman.
- Though [Jade][3] has been seen predominately as a server-side helper for templating,
  I find it incredibly helpful on front-end projects where I'm using a build system
  anyways as the syntax is far easier to read and reduces duplication of segments with
  partials.
- From css to less to sass to [Stylus][4], it's been a long road with css pre-processors,
  but I finally found one that lets me drop all the redundant syntax and focus more on the
  design. I love my curly brace languages, but personally think that it gets in-between
  me and focusing on what's important when dealing with UX, wireframing, or general
  design.
- Lately I've taken the plungin into [Kouto Swiss][5] from [Nib][6], though the latter
  clear influenced the former. Without sass, it was a lonely road not being able to use
  bourban or compass, or hat with less. [Kouto Swiss][5] has added many features I haven't
  seen in other plugins before, it's welcome addition to my toolkit.
- If you're still coding without a linter like [JSHint][7], I'm not sure whether to
  give you a high-five for all the hard work or question your dedication for only
  stupidity.
- Dropped Traceur for [6to5][8] because of it's more readable compiled code. You can read
  more specifics on comparisons at their website.

[1]:https://github.com/gulpjs/gulp
[2]:https://github.com/slushjs/slush
[3]:https://github.com/jadejs/jade
[4]:https://github.com/learnboost/stylus
[5]:https://github.com/krkn/kouto-swiss
[6]:https://github.com/tj/nib
[7]:https://github.com/jshint/jshint
[8]:https://github.com/6to5/6to5




