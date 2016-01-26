import gulp from 'gulp';
import bump from 'gulp-bump';
import git  from 'gulp-git';
import tag  from 'gulp-tag-version';

var update = (importance)=> gulp
  .src(['./package.json'])
  .pipe(bump({type: importance}))
  .pipe(gulp.dest('./'))
  .pipe(git.commit('Updated version.'))
  .pipe(tag());

gulp.task('patch',  ()=> update('patch'));
gulp.task('feature',()=> update('minor'));
gulp.task('release',()=> update('major'));
