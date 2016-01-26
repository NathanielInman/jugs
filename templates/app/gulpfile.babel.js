import gulp                    from 'gulp';
import bump                    from 'gulp-bump';
import git                     from 'gulp-git';
import tag                     from 'gulp-tag-version';
import webpack                 from 'webpack';
import shell                   from 'gulp-shell';
import stylus                  from 'gulp-stylus';
import postcss                 from 'poststylus';
import autoprefixer            from 'autoprefixer';
import nano                    from 'gulp-cssnano';
import jade                    from 'gulp-jade';
import eslint                  from 'gulp-eslint';
import browserSync             from 'browser-sync';
import colors                  from 'colors';
import commonsChunk            from 'webpack/lib/optimize/CommonsChunkPlugin';
import uglifyWebpack           from 'webpack/lib/optimize/UglifyJsPlugin';

// Command used to bump versions of the frontend
var update = (importance)=> gulp
  .src(['./package.json'])
  .pipe(bump({type: importance}))
  .pipe(gulp.dest('./'))
  .pipe(git.commit('Updated version.'))
  .pipe(tag());

// Tasks for SEMVER updating
gulp.task('patch',  ()=> update('patch'));
gulp.task('feature',()=> update('minor'));
gulp.task('release',()=> update('major'));

// Styles - pre-process all styles and push the css to dist
gulp.task('styles',['clean'], processStyles);
gulp.task('styles:watch',processStyles);
function processStyles(){
  return gulp.src('src/styles/**/!(_)*.styl')
    .pipe(stylus({use: postcss([autoprefixer])}))
    .pipe(nano())
    .pipe(gulp.dest('dist/styles/'));
} //end processStyles()

// Jade - convert Jade to HTML
gulp.task('jade',['clean'], processJade);
gulp.task('jade:watch',processJade);
function processJade(){
  return gulp.src('src/app/**/!(_)*.jade')
    .pipe(jade()) //compressed
    .pipe(gulp.dest('dist'));
} //end processJade()


gulp.task('linter', ()=>
  gulp.src(['src/app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format()));

// Scripts - concatenate and minify javascript
gulp.task('scripts', ['linter','clean'], processScripts);
gulp.task('scripts:watch',['linter'],processScripts);
function processScripts(done){
  webpack({
    entry:{
      app: './src/app/app.js',
      vendor:[
        './src/app/vendor/easel',
        './src/app/vendor/ion'
      ]
    },
    plugins:[
      new commonsChunk('vendor','vendor.js',Infinity),
      new uglifyWebpack({minimize: true})
    ],
    output:{
      path: './dist/scripts',
      filename:'[name].js',
      library: 'app',
      libraryTarget: 'this'
    },
    module:{
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader"
        }
      ]
    }
  },(err,stats)=>{
    if(stats.compilation.errors.length){
      stats.compilation.errors.forEach((error)=>{
        console.log(colors.red('[ERROR]')+' :',error.message);
      });
    } //end if
    if(stats.compilation.chunks.length){
      stats.compilation.chunks.forEach((chunk)=>{
        console.log(colors.green('[MODULE]')+' :',chunk.name);
      });
    } //end if
    done();
  });
} //end processScripts()

// Assets - ensure root resources are moved to dist
gulp.task('assets',['clean'],processAssets);
gulp.task('assets:watch',processAssets);
function processAssets(){
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/'));
} //end processAssets()

// Adding all asynchronous build steps into one task
gulp.task('build', ['assets','scripts', 'jade', 'styles']);

// Watch - put a watcher on the folders
gulp.task('watch', ['build','scripts'], ()=>{
  gulp.watch('src/assets/**/*',['assets:watch']);
  gulp.watch('src/**/*.jade', ['jade:watch']);
  gulp.watch('src/styles/**/*.styl', ['styles:watch']);
  gulp.watch('src/app/**/*.js',['scripts:watch']);
  browserSync.init({
    server: './dist/',
    online: true
  });
}); //end 'watch' task

gulp.task('clean', shell.task('rm -rf dist/'));
gulp.task('default', ['watch']);
