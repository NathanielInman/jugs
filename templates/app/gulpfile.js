// Load plugins
var gulp = require('gulp'), // This streaming build system
    browserSync = require('browser-sync'), // Server & live reload system
    reload = browserSync.reload, // Ensure the event emitter is set
    addsrc = require('gulp-add-src'), // Add more source files after init
    stylus = require('gulp-stylus'), // CSS Pre-processor
    <% if (stylesPlugin == 'nib') { %>nib = require('nib'),<% } else if (stylesPlugin == 'kouto swiss') { %>ks = require('kouto-swiss'),<% } %>
    jade = require('gulp-jade'), // Template language for HTML5
    rename = require('gulp-rename'), // Change filenames
    notify = require('gulp-notify'), // Give notification on updates
    babel = require('gulp-babel'), // Babel ECMAScript transpiler (formerly 6to5)
    concat = require('gulp-concat'), // Concatenate files together
    uglify = require('gulp-uglify'), // Make js smaller and more digestable
    jshint = require('gulp-jshint'), // Linter for javascript
    stylish = require('jshint-stylish'); // Makes jshints output pretty

// Styles - pre-process all styles and push the css to dist
gulp.task('styles', function(){
  return gulp.src('src/styles/**/!(_)*.styl')
    .pipe(stylus({
      <% if (stylesPlugin == 'nib') { %>use: nib(),<% } else if (stylesPlugin == 'kouto swiss') { %>use: ks(),<% } %>
      compress: true
    }))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(notify({ message: 'Stylus finished compiling to <%= file.relative %>.' }));
}); //end 'styles' task

// Jade - convert Jade to HTML
gulp.task('jade', function(){
  return gulp.src('src/views/**/!(_)*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist/'))
    .pipe(notify({ message: 'Jade finished compiling to <%= file.relative %>.' }));
}); //end 'jade' task

// Scripts - concatenate & Minify Javascript
gulp.task('scripts', function(){
  // Runtime Scripts
  return gulp.src([
    'src/scripts/**/*.js'
  ])
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter(stylish))
    .pipe(babel({ blacklist: ["useStrict"] }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Script <%= file.relative %> complete.' }));
});

// Assets - ensure root resources are moved to dist
gulp.task('assets',function(){
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/'));
}); //end 'resources' task

// Put all the build  tasks into one task
gulp.task('build', ['styles','jade','assets','scripts']);

// The browser-sync task will start a server but not watch any files.
gulp.task('browser-sync', ['build'], function(){
  browserSync({
    server:{
      baseDir: 'dist/'
    }
  });
}); //end 'browser-sync' task

// Watch
gulp.task('watch', ['browser-sync'], function(){
  // Watch all assets
  gulp.watch('src/assets/**/*',['assets', reload]);

  // Watch stylus files
  gulp.watch('src/styles/**/*.styl', ['styles', reload]);

  // Watch javascript files
  gulp.watch('src/scripts/**/*.js', ['scripts', reload]);

  // Watch jade files
  gulp.watch('src/templates/**/*.jade', ['jade', reload]);
}); //end 'watch' task

// Default Task
gulp.task('default', ['watch']);
