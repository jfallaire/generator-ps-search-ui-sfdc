const packageJson = require('./package.json');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const semver = require('semver');
const exec = util.promisify(require('child_process').exec);

const getNextVersion = currentVersion => {
  return new Promise((resolve, reject) => {
    conventionalRecommendedBump({
        preset: 'angular'
      },
      (err, release) => {
        if (err) {
          reject(err);
          return;
        }

        const nextVersion = semver.valid(release.releaseType) || semver.inc(currentVersion, release.releaseType);

        resolve(nextVersion);
      }
    );
  });
};

getNextVersion(packageJson.version)
  .then(version => {
    //exec()
    console.log(version)
  })
  .catch(error => console.log(error));