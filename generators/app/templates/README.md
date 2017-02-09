# <%- repoName %>

This project is meant to display a working starting point for a SFDC project that wish to extend the [Coveo Javascript Search Framework](https://github.com/coveo/search-ui) with custom styling and additional components.

## Build
    npm install
    gulp

All resources will be available under `./bin` folder.

## Important gulp tasks
* `gulp default` -> Build the whole project (CSS, templates, TypeScript, etc.) and generate its output in the `./bin` folder.
* `gulp build` -> same as default
* `gulp compile` -> Build only the TypeScript code and generate its output in the `./bin` folder.
* `gulp css` -> Build only the Sass code and generate its output in the `./bin` folder.
* `gulp bundle-sfdc` -> Bundle the content of the `./bin` folder in the `./zip` folder.