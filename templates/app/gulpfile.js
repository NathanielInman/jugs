var gulp                  = require('gulp'),
    stylus                = require('gulp-stylus'),
<% if (stylesPlugin == 'nib'){ %>
    nib                   = require('nib'),
<% }else if (stylesPlugin == 'kouto swiss'){ %>
    ks                    = require('kouto-swiss'),<% } %>  
    webpack               = require('webpack-stream'),
    jade                  = require('gulp-jade'),
    named                 = require('vinyl-named'),
    uglify                = require('gulp-uglify'),
    eslint                = require('gulp-eslint'),
    browserSync           = require('browser-sync'),
    reload                = browserSync.reload;

// Styles - pre-process all styles and push the css to dist
gulp.task('styles', function(){
  gulp.src('src/styles/**/!(_)*.styl')
    .pipe(stylus({
<% if (stylesPlugin == 'nib'){ %>
      use: nib(),
<% } else if (stylesPlugin == 'kouto swiss'){ %>
      use: ks(),<% } %>
      compress: true
    }))
    .pipe(gulp.dest('dist/styles/'));
});

// Jade - convert Jade to HTML
gulp.task('jade', function(){
  gulp.src('src/views/**/!(_)*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist/'));
});

// Scripts - concatenate & Minify Javascript
gulp.task('scripts', function(){
  gulp.src(['src/scripts/app.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(named())
    .pipe(webpack({
      module:{
        loaders: [
          { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

// Assets - ensure root resources are moved to dist
gulp.task('assets', function(){
  gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/'));
});

// Put all the build  tasks into one task
gulp.task('build', ['styles','jade','assets','scripts']);

// The browser-sync task will start a server but not watch any files.
gulp.task('browser-sync', ['build'], function(){
  browserSync({server:{baseDir: 'dist/'}});
});

// Watch
gulp.task('watch', ['browser-sync'], function(){
  // Watch all assets
  gulp.watch('src/assets/**/*',['assets', reload]);

  // Watch stylus files
  gulp.watch('src/styles/**/*.styl', ['styles', reload]);

  // Watch javascript files
  gulp.watch('src/scripts/**/*.js', ['scripts', reload]);

  // Watch jade files
  gulp.watch('src/views/**/*.jade', ['jade', reload]);
}); //end 'watch' task

// Default Task
gulp.task('default', ['watch']);
