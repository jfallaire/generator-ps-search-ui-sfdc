'use strict';
const path = require('path');
const _ = require('lodash');
var mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('customer', {
            type: String,
            required: true,
            desc: 'Customer name'
        });
    }

    initializing() {
        this.props = {};
        this.props.customerName = this.options.customer;
        this.props.customerSafeName = _.snakeCase(this.options.customer);
    }

    writing() {
        const templateObj = { 
          customerSafeName : this.props.customerSafeName,
          capitalizeCustomerSafeName : this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase()),
        }

        // Custo
        this.fs.copyTpl(
          this.templatePath('src/custo/ProjectCusto.ts'),
          this.destinationPath(path.join('src', 'custo', templateObj.capitalizeCustomerSafeName + 'Custo.ts')),
          templateObj 
        );

        // Helper
        this.fs.copyTpl(
          this.templatePath('src/custo/ProjectHelper.ts'),
          this.destinationPath(path.join('src', 'custo', templateObj.capitalizeCustomerSafeName + 'Helper.ts')),
          templateObj 
        );

        // Initialization
        this.fs.copyTpl(
          this.templatePath('src/custo/ProjectInitialization.ts'),
          this.destinationPath(path.join('src', 'custo', templateObj.capitalizeCustomerSafeName + 'Initialization.ts')),
          templateObj 
        );

        // Index.ts
        this.fs.copyTpl(
          this.templatePath('src/Index.ts'),
          this.destinationPath('src/Index.ts'),
          templateObj 
        );

        this.fs.copy(
          this.templatePath('src/events/CustomEvents.ts'),
          this.destinationPath('src/events/CustomEvents.ts')
        );

        mkdirp.sync(this.destinationPath('src/ui'));
        
    }
}