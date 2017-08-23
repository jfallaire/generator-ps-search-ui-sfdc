const gulp = require('gulp');
const zip = require('gulp-zip');
const unzip = require('gulp-unzip');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const insert = require('gulp-insert');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const runsequence = require('run-sequence');
const cfg = require('../config');

gulp.task('prepareSfdc', ['prepareSfdcResourceBundles','prepareSfdcVfComponents', 'prepareSfdcVfPages', 'prepareSfdcLightningComponents', 'prepareSfdcClasses'])

gulp.task('bundleSfdc',['zip-staticresources']);

gulp.task('deploySfdc', ['deploy-staticresources', 'deploy-staticresources-unpackaged', 'deploy-staticresources-bundles', 'deploy-vfcomponents', 'deploy-vfpages', 'deploy-lightningcomponents', 'deploy-classes']);

// PREPARE

gulp.task('prepareSfdcResourceBundles', function (done) {
  return gulp.src(['!./bin/vendor/coveo/**/*', '!./bin/image/**/*', './bin/**/*.Custom.*', './bin/**/*.<%= capitalizeCustomerSafeName %>.*'])
    .pipe(gulp.dest('./bin/sfdc/staticresources'));
});

gulp.task('prepareSfdcVfComponents', function () {
  gulp.src(['./sfdc/components/*.ejs'])
    .pipe(ejs({
      prototypeTitle: '<%= capitalizeCustomerSafeName %> SFDC VF Components',
      config: cfg
    }, {
      ext: '.component'
    }).on('error', gutil.log))
    .pipe(gulp.dest('./bin/sfdc/components'))
    .pipe(livereload());
});

gulp.task('prepareSfdcVfPages', function () {
  gulp.src(['./sfdc/pages/*.ejs'])
    .pipe(ejs({
      prototypeTitle: '<%= capitalizeCustomerSafeName %> SFDC VF Pages',
      config: cfg
    }, {
      ext: '.page'
    }).on('error', gutil.log))
    .pipe(gulp.dest('./bin/sfdc/pages'))
    .pipe(livereload());
});

gulp.task('prepareSfdcLightningComponents', function () {
  gulp.src(['./sfdc/aura/**/*'])
    .pipe(ejs({
      prototypeTitle: '<%= capitalizeCustomerSafeName %> SFDC Lightning Components',
      config: cfg
    }).on('error', gutil.log))
    .pipe(gulp.dest('./bin/sfdc/aura'))
    .pipe(livereload());
});

gulp.task('prepareSfdcClasses', function () {
  gulp.src(['./sfdc/classes/**/*'])
    .pipe(ejs({
      prototypeTitle: '<%= capitalizeCustomerSafeName %> SFDC Classes',
      config: cfg
    }).on('error', gutil.log))
    .pipe(gulp.dest('./bin/sfdc/classes'))
    .pipe(livereload());
});

// BUNDLE

gulp.task('zip-staticresources', function (done) {
  return gulp.src(['./bin/sfdc/staticresources/**/*'])
    .pipe(zip('sfdc-bundle.zip'))
    .pipe(rename('<%= capitalizeCustomerSafeName %>_Coveo_UI.resource'))
    .pipe(gulp.dest('./bin/sfdc/bundle/zip/'));
});

// DEPLOY

gulp.task('deploy-staticresources', function (done) {
  return gulp.src('./bin/sfdc/bundle/zip/<%= capitalizeCustomerSafeName %>_Coveo_UI.resource')
    .pipe(gulp.dest('../Salesforce/dev_org/src/staticresources/'));
});

gulp.task('deploy-staticresources-unpackaged', function (done) {
  return gulp.src('./bin/sfdc/bundle/zip/<%= capitalizeCustomerSafeName %>_Coveo_UI.resource')
    .pipe(gulp.dest('../Salesforce/dev_org/src/unpackaged/staticresources/'));
});

gulp.task('deploy-staticresources-bundles', function (done) {
  return gulp.src(['./bin/sfdc/staticresources/**/*'])
    .pipe(gulp.dest('../Salesforce/dev_org/resource-bundles/<%= capitalizeCustomerSafeName %>_Coveo_UI.resource/'));
});

gulp.task('deploy-vfcomponents', function (done) {
  return gulp.src('./bin/sfdc/components/*')
    .pipe(gulp.dest('../Salesforce/dev_org/src/unpackaged/components/'));
});

gulp.task('deploy-vfpages', function (done) {
  return gulp.src('./bin/sfdc/pages/*')
    .pipe(gulp.dest('../Salesforce/dev_org/src/unpackaged/pages/'));
});

gulp.task('deploy-lightningcomponents', function (done) {
  return gulp.src('./bin/sfdc/aura/**/*')
    .pipe(gulp.dest('../Salesforce/dev_org/src/unpackaged/aura/'));
});

gulp.task('deploy-classes', function (done) {
  return gulp.src('./bin/sfdc/classes/*')
    .pipe(gulp.dest('../Salesforce/dev_org/src/unpackaged/classes/'));
});
