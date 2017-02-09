'use strict';
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('buildResources', done => {
  runSequence('zipSalesforceIntegration', 'copySalesforceIntegrationResources', done);
});
