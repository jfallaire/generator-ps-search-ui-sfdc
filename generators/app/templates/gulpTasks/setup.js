const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const insert  = require('gulp-insert');
const ejs = require('gulp-ejs');
const livereload = require('gulp-livereload');
const cfg = require('../config');

gulp.task('setup', ['preparePages', 'copy']);

gulp.task('copy', ['copyVendor', 'copyJS', 'copyCSS', 'copyFonts', 'copyImage', 'copyCultures']);

gulp.task('sfdc', ['prepareSfdc']);

gulp.task('preparePages', function () {
    // gulp.src(['views/pages/*.ejs'])
    //     .pipe(ejs({ 
    //       prototypeTitle : '<%= capitalizeCustomerSafeName %> Search Prototype',
    //       config: cfg,
    //       token: '',
    //       userInfos: {}
    //     }, {ext:'.html'}))
    //     .pipe(gulp.dest('./public'))
    //     .pipe(livereload());
});

gulp.task('copyVendor', function (done) {
  return gulp.src(['./vendor/**/*'])
    .pipe(gulp.dest('./public/vendor'));
});

gulp.task('copyJS', function () {
  gulp.src([
      // './node_modules/coveo-search-ui/bin/js/**/*',
      './vendor/coveo/resources/js/components.js',
      './vendor/coveo/Box/js/templates/box.new.templates.js',
      './vendor/coveo/Box/js/*.js'
    ]).pipe(gulp.dest('./public/js'))
});

gulp.task('copyCSS', function () {
  gulp.src([
    // './node_modules/coveo-search-ui/bin/css/*.css',
    './vendor/coveo/Box/css/*.css'
  ]).pipe(gulp.dest('./public/css'))
});

gulp.task('copyFonts', function () {
  /*gulp.src([
    './vendor/project/fonts/*.*',
  ]).pipe(gulp.dest('./bin/fonts'))*/
});

gulp.task('copyCultures', function () {
  gulp.src([
    './src/cultures/*.js',
  ]).pipe(gulp.dest('./public/js/cultures'))
});
gulp.task('copyImage', function () {
  gulp.src('./node_modules/coveo-search-ui/bin/image/*')
      .pipe(gulp.dest('./public/image'))
});