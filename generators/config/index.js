'use strict';
const path = require('path');
const _ = require('lodash');
const Generator = require('yeoman-generator');
const utils = require('../../utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('customer', {
            type: String,
            required: true,
            desc: 'Customer name'
        });

        this.option('destinationRoot', {
            type: String,
            required: true,
            desc: 'Destination root'
        });
    }

    initializing() {
        this.props = {};
        this.props.customerName = this.options.customer;
        this.props.destinationRoot = this.options.destinationRoot;
        // this.props.customerSafeName = _.snakeCase(this.options.customer);
        this.props.customerSafeName = _.camelCase(this.options.customer);
    }

    writing() {
        this.destinationRoot(this.props.destinationRoot);
        const authorEmail = this.fs.readJSON(this.destinationPath('package.json'), {}).author.email || 'platform@coveo.com';

        this.log('writing: ' + this.options.customer);

        
        let tagNameParts = this.props.coveo_latest_tag_name.split('.');
        if(tagNameParts[0] != '2'){
            this.log('***WARNING***: this project generator does not support the current Coveo latest version : ' +  this.props.coveo_latest_tag_name);
        }

        this.fs.copyTpl(
          this.templatePath('**'),
          this.destinationPath('config'), 
          { 
            customerSafeName : this.props.customerSafeName,
            capitalizeCustomerSafeName : this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase()),
            authorEmail : authorEmail,
            coveoSearchUIVersion: `${tagNameParts[0]}.${tagNameParts[1]}`
          }
        );
    }

    getCoveoLatestVersion() {

        return utils.getNpmLatestVersion('coveo-search-ui').then((res) => {
            this.log('latest release info >>> ' + res.stdout);
            this.props.coveo_latest_tag_name = res.stdout;
        }, (err) => {
            this.log('something went wrong >>> ' + err);
        });
    }
}