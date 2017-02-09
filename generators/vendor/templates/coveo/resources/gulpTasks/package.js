'use strict';
const gulp = require('gulp');
const gulpZip = require('gulp-zip');
const eventStream = require('event-stream');
const rename = require('gulp-rename');
const fs = require('fs');
const replace = require('gulp-replace');
const dom = require('gulp-dom');
const uglify = require('gulp-uglify');
const destination = './apex/misc/staticresources';


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

var namespacePrefix = require('../../environments/release.env.json').NAMESPACE_PREFIX;
var randomInt = getRandomInt(1, 999999999);
var resourcePrefix = '';

try {
  const prefixInDev = require('../../environments/dev.env.json').NAMESPACE_PREFIX;

  if (prefixInDev) {
    namespacePrefix = prefixInDev;
  }
} catch (err) {
  console.log(`No dev prefix found : Using ${namespacePrefix}`);
  console.error(err.message);
}

if (!namespacePrefix) {
		// Default namespace is c.
		namespacePrefix = 'c';
}

if (namespacePrefix.length > 0 && namespacePrefix != 'c') {
		resourcePrefix = namespacePrefix + "__";
}

console.log('Using namespace : ' + namespacePrefix);

gulp.task('copyPageViewScript', () => {
  return gulp.src('./node_modules/coveo.analytics/dist/coveoua.js')
    .pipe(uglify())
    .pipe(rename('coveoua.min.js'))
    .pipe(gulp.dest('./resources/js/'))
})

gulp.task('zipSalesforceIntegration', () => {
  // Delete the file beforehand, otherwise some crap might be kept in it
  // from a previous build, greatly confusing poor Martin.
  if (fs.existsSync('./apex/misc/staticresources/resources.resource')) {
    fs.unlinkSync('./apex/misc/staticresources/resources.resource');
  }

  if (fs.existsSync('./apex/misc/staticresources/InterfaceEditor.resource')) {
    fs.unlinkSync('./apex/misc/staticresources/InterfaceEditor.resource');
  }

  return gulp.src('./resources/**/*')
    .pipe(gulpZip('resources.resource'))
    .pipe(gulp.dest(destination));
});

gulp.task('copySalesforceIntegrationResources', done => {
  eventStream.merge(
    gulp
      .src('./zip/CoveoInterfaceEditor.zip')
      .pipe(rename('InterfaceEditor.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./zip/CoveoBox.zip')
      .pipe(rename('Box.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./zip/CoveoLightning.zip')
      .pipe(rename('Lightning.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./unzip/CoveoInterfaceEditor/repositories.json')
      .pipe(rename('Repositories.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./unzip/Box/repositories.json')
      .pipe(rename('BoxRepositories.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./unzip/CoveoBox/DefaultSalesforceBox.html')
      .pipe(rename('DefaultBoxSearch.resource'))
      .pipe(gulp.dest(destination)),

    gulp.src('./caseCreation/pages/DefaultCaseCreation.html')
      .pipe(rename('DefaultCaseCreationSearch.resource'))
      .pipe(gulp.dest(destination)),

    gulp.src('./ts/page/DefaultRecommendation.html')
      .pipe(rename('DefaultRecommendation.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./caseCreation/pages/DefaultCaseCreation.html')
      .pipe(rename('DefaultLightningCaseCreationSearch.resource'))
      .pipe(replace(/data-enable-history="true"/, 'data-enable-history="false"'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./node_modules/coveo-search-ui/bin/css/CoveoFullSearch.css')
      .pipe(replace('../image/sprites.png', `${resourcePrefix}JsSearch/image/sprites.png?v='${randomInt}`))
      .pipe(rename('CoveoFullSearch.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./node_modules/coveo-search-ui/bin/css/CoveoFullSearchNewDesign.css')
      .pipe(replace('../image/spritesNew.png', `${resourcePrefix}JsSearch/image/spritesNew.png?v=${randomInt}`))
      .pipe(replace('../image/retinaNew.png', `${resourcePrefix}JsSearch/image/retinaNew.png?v=${randomInt}`))
      .pipe(rename('CoveoFullSearchNewDesign.resource'))
      .pipe(gulp.dest(destination)),

    gulp
      .src('./unzip/CoveoInterfaceEditor/DefaultSearch.html')
      .pipe(rename('DefaultSearch.resource'))
      .pipe(gulp.dest(destination))
      .pipe(rename('DefaultLightningSearch.resource'))
      .pipe(replace(/data-enable-history="true"/, ''))
      .pipe(dom(function () {
        // Take the normal search page, but remove useless parts in the community/lightning page
        // The search box is at the top of the page, not inside the component itself
        const settings = this.querySelector('.CoveoSettings');
        const searchBox = this.querySelector('.CoveoSearchbox');
        const shareQuery = this.querySelector('.CoveoShareQuery');
        const prefPanel = this.querySelector('.CoveoPreferencesPanel');

        settings.parentElement.removeChild(settings);
        searchBox.parentElement.removeChild(searchBox);
        shareQuery.parentElement.removeChild(shareQuery);
        prefPanel.parentElement.removeChild(prefPanel);

        return this.querySelector('body').innerHTML;
      }, false))
      .pipe(replace(/&lt;/, '<'))
      .pipe(replace(/&gt;/, '>'))
      .pipe(replace('<!--[[tag]]-->', '</[[tag]]>'))
      .pipe(gulp.dest(destination)),

    gulp.src('./unzip/CoveoInterfaceEditor/DefaultMobileSearch.html')
      .pipe(rename('DefaultMobileSearch.resource'))
      .pipe(gulp.dest(destination))


  ).pipe(eventStream.wait(done));
});

gulp.task('copyInterfaceEditor', () => {
  return gulp
    .src('./node_modules/@coveo/interface-editor/target/interfaceEditor/package/**/*')
    .pipe(gulp.dest('./unzip/CoveoInterfaceEditor/'));
});

gulp.task('zipInterfaceEditor', ['setupInterfaceEditor'], () => {

  return gulp
    .src('./unzip/CoveoInterfaceEditor/**/*')
    .pipe(gulpZip('CoveoInterfaceEditor.zip'))
    .pipe(gulp.dest('./zip/'));
});

const replaceRegex = /path="Externals.d.ts"/;
const replaceWith = 'path="../../../node_modules/coveo-search-ui/bin/ts/Externals.d.ts"';
const dest = './unzip/CoveoInterfaceEditor/lib/';

gulp.task('setupInterfaceEditor', ['copyInterfaceEditor'], done => {

  eventStream
    .merge(
    gulp
      .src('./unzip/CoveoInterfaceEditor/lib/InterfaceEditor.d.ts')
      .pipe(
      replace(/path="CoveoJsSearch.d.ts"/, 'path="../../../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts"')
      )
      .pipe(gulp.dest(dest)),

    gulp
      .src('./unzip/CoveoInterfaceEditor/lib/DialogBox.d.ts')
      .pipe(replace(replaceRegex, replaceWith))
      .pipe(gulp.dest(dest)),

    gulp
      .src('./unzip/CoveoInterfaceEditor/lib/Draggable.d.ts')
      .pipe(replace(replaceRegex, replaceWith))
      .pipe(gulp.dest(dest))
    ).pipe(eventStream.wait(done));
});
