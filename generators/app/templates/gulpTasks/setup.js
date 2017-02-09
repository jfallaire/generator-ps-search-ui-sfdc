const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const insert  = require('gulp-insert');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const livereload = require('gulp-livereload');
const cfg = require('../config');

gulp.task('setup', ['prepareVFComponents', 'preparePages', 'copy']);

gulp.task('copy', ['copyJS', 'copyCSS', 'copyFonts', 'copyImage']);

gulp.task('prepareStaticResources', function () {
    gulp.src(['./bin/**/*.<%= capitalizeCustomerSafeName %>.*'])
        .pipe(gulp.dest('./bin/sfdc/staticresources'))
        .pipe(livereload());
});

gulp.task('prepareVFComponents', function () {
    gulp.src(['./views/partials/agentfull-searchInterface.ejs'])
        .pipe(ejs({}, {ext:'.html'}).on('error', gutil.log))
        .pipe(insert.prepend('<apex:component >\n'))
        .pipe(insert.append('</apex:component>'))
        .pipe(rename('AgentFullSearch.component'))
        .pipe(gulp.dest('./bin/sfdc/components'))
        .pipe(livereload());
    gulp.src(['./views/partials/agentbox-searchInterface.ejs'])
        .pipe(ejs({}, {ext:'.html'}).on('error', gutil.log))
        .pipe(insert.prepend('<apex:component >\n'))
        .pipe(insert.append('</apex:component>'))
        .pipe(rename('AgentBox.component'))
        .pipe(gulp.dest('./bin/sfdc/components'))
        .pipe(livereload());
});

gulp.task('preparePages', function () {
    gulp.src(['views/pages/*.ejs'])
        .pipe(ejs({ 
          prototypeTitle : '<%= capitalizeCustomerSafeName %> Search Prototype',
          config: cfg
        }, {ext:'.html'}))
        .pipe(gulp.dest('./bin'))
        .pipe(livereload());
});

gulp.task('copyJS', function () {
  gulp.src([
      './node_modules/coveo-search-ui/bin/js/CoveoJsSearch*',
      './node_modules/coveo-search-ui/bin/js/templates/templates*',
      './vendor/coveo/resources/js/components.js',
      './vendor/coveo/Box/js/templates/box.new.templates.js',
      './vendor/coveo/Box/js/*.js'
    ]).pipe(gulp.dest('./bin/js'))
});

gulp.task('copyCSS', function () {
  gulp.src([
    './node_modules/coveo-search-ui/bin/css/*.css',
    './vendor/coveo/Box/css/*.css'
  ]).pipe(gulp.dest('./bin/css'))
});

gulp.task('copyFonts', function () {
  /*gulp.src([
    './vendor/project/fonts/*.*',
  ]).pipe(gulp.dest('./bin/fonts'))*/
});

gulp.task('copyImage', function () {
  gulp.src('./node_modules/coveo-search-ui/bin/image/*')
      .pipe(gulp.dest('./bin/image'))
});