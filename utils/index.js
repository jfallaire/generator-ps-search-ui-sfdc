'use strict';
const _ = require('lodash');

module.exports = {
    makeRepoName : (name) => {
        name = _.kebabCase(name);
        name = name.indexOf('-search-ui') > 0 ? name : name + '-search-ui';
        return name;
    }
}
