'use strict';
const _ = require('lodash');
const https = require('https');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    makeRepoName: (name) => {
        name = _.kebabCase(name);
        name = name.indexOf('-search-ui') > 0 ? name : name + '-search-ui';
        return name;
    },
    getNpmLatestVersion: (repoName) => {
        return exec(`npm view ${repoName} version`);
    },
    getGithubLatestRelease: (owner, repo) => {
        var options = {
            method: 'GET',
            host: 'api.github.com',
            path: `/repos/${owner}/${repo}/releases/latest`,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'request'
            }
        };
        return new Promise((resolve, reject) => {
            const request = https.request(options, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
                // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                // handle http errors
                if (res.statusCode < 200 || res.statusCode > 299) {
                    reject({statusCode: res.statusCode, message:res.statusMessage});
                }
                // temporary data holder
                const body = [];
                res.setEncoding('utf8');
                // on every content chunk, push it to the data array
                res.on('data', (chunk) => body.push(chunk));
                // we are done, resolve promise with those joined chunks
                res.on('end', () => resolve(body.join('')));
            });
            request.on('error', (err) => reject({statusCode: '', message:err}));
            request.end();
        });
    }
}
