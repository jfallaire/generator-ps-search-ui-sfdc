const gulp = require('gulp');
const rename = require('gulp-rename');
const requireDir = require('require-dir');
const rmdir = require('gulp-rimraf');
const zip = require('gulp-zip');
const streamify = require('gulp-streamify');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const runsequence = require('run-sequence');
const colors = require('colors');
const minimize = process.argv.indexOf('--minimize') !== -1;
const cfg = require('./config');
const _ = require('underscore');

var bundles = _.map(cfg.<%=customerSafeName%>.webpack_config, (v, k) => k);

process.env.NODE_ENV = gutil.env.config || 'development';
process.env.CUSTOM_BUNDLE = gutil.env.bundle || 'support';

var bannerMsg = minimize ? 'Building minified version' : 'Building non minified version';

requireDir('./gulpTasks');

gulp.task('default', ['buildAll']);

gulp.task('prepublish', ['buildAll']);

gulp.task('buildAll', function (done) {
  console.log((bannerMsg + ' for all distribution [' + bundles.join(', ') + ']').bgGreen.red);
  runsequence('clean', ['css', 'setup'], 'prettify', 'compileAll', done);
});

gulp.task('build', function (done) {
  console.log((bannerMsg + ' of the library [' + process.env.CUSTOM_BUNDLE + ' bundle]').bgGreen.red);
  runsequence('clean', ['css', 'setup'], 'prettify', 'compile', done);
});

gulp.task('bundle', function (done) {
  console.log((bannerMsg + ' of the library [' + process.env.CUSTOM_BUNDLE + ' bundle]').bgGreen.red);
  runsequence('clean', ['css'], 'bundle-sfdc', done);
});

gulp.task('clean', function (done) {
  return gulp.src(['./bin', './zip'], {
      read: false
    })
    .pipe(rmdir());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./sass/**/*'], ['css']);
  //gulp.watch(['./views/**/*'], ['prepareVFComponents', 'preparePages']);
});

gulp.task('bundle-sfdc', function (done) {
  return gulp.src([
      './bin/**/*.<%= capitalizeCustomerSafeName %>.*'
    ])
    .pipe(zip('ps-search-ui-sfdc-bundle.zip'))
    .pipe(rename('<%= capitalizeCustomerSafeName %>_Coveo_UI.resource'))
    .pipe(gulp.dest('./zip/'));
});

gulp.task('deploy-sfdc', function (done) {
  return gulp.src('./zip/<%= capitalizeCustomerSafeName %>_Coveo_UI.resource')
    .pipe(gulp.dest('../Salesforce/src/staticresources/'));
});