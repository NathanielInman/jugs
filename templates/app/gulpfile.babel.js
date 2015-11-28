import gulp                  from 'gulp';
import stylus                from 'gulp-stylus';
import ks                    from 'kouto-swiss';
import webpack               from 'webpack-stream';
import jade                  from 'gulp-jade';
import named                 from 'vinyl-named';
import uglify                from 'gulp-uglify';
import eslint                from 'gulp-eslint';
import browserSync, {reload} from 'browser-sync';

// Styles - pre-process all styles and push the css to dist
gulp.task('styles', ()=>
  gulp.src('src/styles/**/!(_)*.styl')
    .pipe(stylus({
      use: ks(),
      compress: true
    }))
    .pipe(gulp.dest('dist/styles/')));

// Jade - convert Jade to HTML
gulp.task('jade', ()=>
  gulp.src('src/views/**/!(_)*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist/')));

// Scripts - concatenate & Minify Javascript
gulp.task('scripts', ()=>
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
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts')));

// Assets - ensure root resources are moved to dist
gulp.task('assets', ()=>
  gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/')));

// Put all the build  tasks into one task
gulp.task('build', ['styles','jade','assets','scripts']);

// The browser-sync task will start a server but not watch any files.
gulp.task('browser-sync', ['build'], ()=>
  browserSync({server:{baseDir: 'dist/'}}));

// Watch
gulp.task('watch', ['browser-sync'], ()=>{
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
