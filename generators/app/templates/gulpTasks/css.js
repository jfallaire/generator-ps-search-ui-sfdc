const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const event_stream = require('event-stream');

gulp.task('css', ['build-css']);

gulp.task('prepareSass', function () {
  return event_stream.merge(
      gulp.src('./sass/**/*')
          .pipe(gulp.dest('./bin/sass/'))
    ).pipe(event_stream.wait())
});

gulp.task('build-css', function (done){
  return gulp.src(['./sass/*.scss'])
  .pipe(sass({ includePaths: ['./sass/ui'] }))
  .pipe(rename(function (path){
    path.basename += '.<%= capitalizeCustomerSafeName %>';
  }))
  .pipe(gulp.dest('./bin/css'));
});
