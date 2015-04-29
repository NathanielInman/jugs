/// <reference path="typings/node/node.d.ts"/>
// Load plugins
var gulp     = require('gulp'),
    semver   = require('semver'),
    bump     = require('gulp-bump'),
    git      = require('gulp-git'),
    tag      = require('gulp-tag-version');

var inc = function (importance) {
  return gulp.src(['./package.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Release v' + semver.inc(
      require(__dirname + '/package.json').version,
      importance)))
    .pipe(tag())
    .on('end',function(){
      this.pipe(git.push('origin','master', {args: '--tags'}))
    });
};

// Version bumping
gulp.task('patch', function () { return inc('patch'); });
gulp.task('feature', function () { return inc('minor'); });
gulp.task('release', function () { return inc('major'); });
