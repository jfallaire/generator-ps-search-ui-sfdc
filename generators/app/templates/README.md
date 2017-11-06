# <%- repoName %>

This project is meant to display a working starting point for a SFDC project that wish to extend the [Coveo Javascript Search Framework](https://github.com/coveo/search-ui) with custom styling and additional components.

## Build
    npm install
    gulp

All resources will be available under `./bin` folder.

## Important gulp tasks
* `gulp default` -> Build the whole project (CSS, templates, TypeScript, etc.) and generate its output in the `./bin` folder.
* `gulp build` -> same as default
* `gulp dev` -> use port 3001 for realtime changes
* `gulp compile` -> Build only the TypeScript code and generate its output in the `./bin` folder.
* `gulp css` -> Build only the Sass code and generate its output in the `./bin` folder.
* `gulp bundle-sfdc` -> Bundle the content of the `./bin` folder in the `./zip` folder.

## Compilation Settings
* `gulp dev --config` -> Set configuration (e.g.: development,uat,production)
* `gulp dev --auth` -> Set authentication application (e.g.: devLocal,devAzure,devClient,uatClient,prodClient)
* `gulp dev --filterExpression` -> Override default filter expression (e.g.: @uri)
* `gulp dev --impersonateUser` -> Set user to impersonat (e.g.: --impersonateUser=user1@coveo.com or --impersonateUser="user1@coveo.com;user2@coveo.com" for multiple users)
* `gulp dev --additionalUser` -> Set an additionalUser

## Tips n trick for developers on Windows
* `gulp;gulp prepareSfdc;gulp bundleSfdc;gulp deploySfdc` -&gt; build, prepare, bundle and deploy the SFDC project

## How to run DEV on your local machine
* `gulp dev --impersonateUser="someone@dev.somewhere.com"` -> http://localhost:3001 

## How to run UAT on your local machine
* `gulp dev --config=uat --impersonateUser="someone@uat.somewhere.com"` -> http://localhost:3001

## How to run PRODUCTION your local machine
* Inside `config\config.production.js` set `config.enableImpersonateUser` to `true`
* `gulp dev --config=production --impersonateUser="someone@somewhere.com"` -> http://localhost:3001