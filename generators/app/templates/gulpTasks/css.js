const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const event_stream = require('event-stream');

gulp.task('css', ['build-communityFullSearchCss', 'build-agentBoxCss', 'build-agentFullCss']);

gulp.task('prepareSass', function () {
  return event_stream.merge(
      gulp.src('./sass/**/*')
          .pipe(gulp.dest('./bin/sass/'))
    ).pipe(event_stream.wait())
});

gulp.task('build-communityFullSearchCss', function (done) {
  return gulp.src('./sass/CommunityFullSearch.scss')
    .pipe(sass({ includePaths: ['./sass/modules'] }))
    .pipe(rename('CommunityFullSearch.<%= capitalizeCustomerSafeName %>.css'))
    .pipe(gulp.dest('./bin/css'));
});

gulp.task('build-agentBoxCss', function (done) {
  return gulp.src('./sass/AgentBox.scss')
    .pipe(sass({ includePaths: ['./sass/modules'] }))
    .pipe(rename('AgentBox.<%= capitalizeCustomerSafeName %>.css'))
    .pipe(gulp.dest('./bin/css'));
});

gulp.task('build-agentFullCss', function (done) {
  return gulp.src('./sass/AgentFullSearch.scss')
    .pipe(sass({ includePaths: ['./sass/modules'] }))
    .pipe(rename('AgentFullSearch.<%= capitalizeCustomerSafeName %>.css'))
    .pipe(gulp.dest('./bin/css'));
});