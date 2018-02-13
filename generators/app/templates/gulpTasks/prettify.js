const gulp = require('gulp');
const prettyTypescript = require('pretty-typescript');

gulp.task('prettify', function () {
  return gulp.src(['src/**/*.ts', '!src/strings/**/*.ts'])
    .pipe(prettyTypescript())
    .pipe(gulp.dest('src'));

});