'use strict';
const path = require('path');
const _ = require('lodash');
const Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

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
        const templateObj = { 
          customerSafeName : this.props.customerSafeName,
          capitalizeCustomerSafeName : this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase()),
        }

        this.fs.copyTpl(
          this.templatePath('**'),
          this.destinationPath('views'), 
          templateObj
        );

        mkdirp.sync(this.destinationPath('views/partials'));
        mkdirp.sync(this.destinationPath('views/pages'));
    }
}