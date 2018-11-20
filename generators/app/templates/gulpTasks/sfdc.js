const gulp = require('gulp');
const ejs = require('gulp-ejs');
const log = require('fancy-log');
const livereload = require('gulp-livereload');
const runsequence = require('run-sequence');
const cfg = require('../config');


gulp.task('compileSfdc', ['prepareSfdcResourceBundles','prepareSfdc'])

gulp.task('deploySfdc', ['deploy-staticresources-bundles', 'deploy-sfdc']);

// PREPARE

gulp.task('prepareSfdcResourceBundles', function (done) {
  return gulp.src([
    '!./public/vendor/coveo/**/*', 
    '!./public/vendor/repsrv/**/*',
    '!./public/vendor/salesforce-ux/**/*',
    './public/**/*.svg', 
    './public/**/*.png',
    './public/**/*.jpg', 
    './public/**/*.Custom.*', 
    './public/**/*.<%= capitalizeCustomerSafeName %>.*',
    './public/**/custom/*.js'])
    .pipe(gulp.dest('./bin/sfdc/staticresources'));
});

gulp.task('prepareSfdc', function () {
  gulp.src(['./sfdc/**/*'])
    .pipe(ejs({
      config: cfg
    }).on('error', log))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./bin/sfdc/src'))
    .pipe(livereload());
});

// DEPLOY

gulp.task('deploy-staticresources-bundles', function (done) {
  return gulp.src(['./bin/sfdc/staticresources/**/*'])
    .pipe(gulp.dest('../Salesforce/resource-bundles/<%= capitalizeCustomerSafeName %>_Coveo_UI.resource/'));
});

gulp.task('deploy-sfdc', function (done) {
  return gulp.src(['./bin/sfdc/src/**/*'])
    .pipe(gulp.dest('../Salesforce/src/'));
});