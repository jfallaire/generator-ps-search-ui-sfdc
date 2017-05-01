const gulp = require('gulp');
const shell = require('gulp-shell');
const eol = require('gulp-eol');
const os = require('os');
const isWindows = os.platform() === 'win32';
const _ = require('underscore');
const cfg = require('../config');

var compileAllTasks = [];
_.each(cfg.<%= customerSafeName %>.webpack_config, (wc, key) => {
  var tasks = [
    (isWindows ? 'set ' : '') + 'NODE_ENV=' + process.env.NODE_ENV,
    (isWindows ? 'set ' : '') + 'CUSTOM_BUNDLE=' + key,
    'node node_modules/webpack/bin/webpack.js'
  ]
  compileAllTasks.push(tasks.join((isWindows ? '&&' : ' && ')));
});

gulp.task('compile', ['addEolDependencies'], shell.task([
  // NODE_ENV=production sets an environement variable that will allow other tasks to know when we are building for production.
  (isWindows ? 'set ' : '') + 'NODE_ENV=' + process.env.NODE_ENV, 
  (isWindows ? 'set ' : '') + 'CUSTOM_BUNDLE=' + process.env.CUSTOM_BUNDLE, 
  'node node_modules/webpack/bin/webpack.js'
].join((isWindows ? '&&' : ' && '))));

gulp.task('minimize', ['addEolDependencies'], shell.task([
  'node node_modules/webpack/bin/webpack.js --minimize'
]));

// This cause an issue when dep are bundled together : the lack of EOL makes it so
// that part of the bundled code can be commented out or not valid
gulp.task('addEolDependencies', function () {
  return gulp.src('./node_modules/underscore/underscore-min.js')
      .pipe(eol())
      .pipe(gulp.dest('./node_modules/underscore/'))
});

gulp.task('compileAll', ['addEolDependencies'], shell.task(compileAllTasks));