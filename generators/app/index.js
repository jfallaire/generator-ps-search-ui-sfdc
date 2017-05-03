'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const chalk = require('chalk');
const yosay = require('yosay');
const utils = require('../../utils');

module.exports = class extends Generator {

    initializing() {
        this.props = {};
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the fabulous ' + chalk.red('ps-search-ui-sfdc') + ' generator!'
        ));

        var prompts = [{
          type: 'input',
          name: 'customer',
          message: 'Your customer name?',
          default: path.basename(process.cwd())
        }];

        return this.prompt(prompts).then(function (props) {
          this.props = props;
          this.props.repoName = utils.makeRepoName(this.props.customer);
          this.props.customerSafeName = _.snakeCase(this.props.customer);
        }.bind(this));
        
    }

    default() {
        if (path.basename(this.destinationPath()) !== this.props.repoName) {
            this.log(
                'You must be inside a folder named ' + this.props.repoName + '\n' +
                'I\'ll automatically create this folder.'
            );
            mkdirp(this.props.repoName);
            this.destinationRoot(this.destinationPath(this.props.repoName));
        }
        const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
        this.composeWith(require.resolve('generator-node/generators/app'), {
          babel: false,
          boilerplate: false,
          name: this.props.repoName,
          projectRoot: this.props.repoName,
          skipInstall: this.options.skipInstall,
          readme: readmeTpl({
              repoName : this.props.repoName
          })
        });

        this.composeWith(require.resolve('../config'), {
          customer: this.props.customer
        });

        this.composeWith(require.resolve('../typescript'), {
          customer: this.props.customer
        });

        this.composeWith(require.resolve('../sass'), {
          customer: this.props.customer
        });

        this.composeWith(require.resolve('../vendor'), {
          customer: this.props.customer
        });

        this.composeWith(require.resolve('../views'), {
          customer: this.props.customer
        });
        
        
    }

    writing() {
        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        const templatePkg = this.fs.readJSON(this.templatePath('package.json'), {});
        const templateObj = {
            customerSafeName : this.props.customerSafeName,
            capitalizeCustomerSafeName : this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase())
        }

        extend(pkg, {
            dependencies: templatePkg.dependencies,
            devDependencies: templatePkg.devDependencies,
            keywords: templatePkg.keywords
        });

        // overwrite default scripts by template ones
        pkg.scripts = templatePkg.scripts

        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        // gulp tasks
        this.fs.copyTpl(
          this.templatePath('gulpTasks/*'),
          this.destinationPath('gulpTasks'),
          templateObj
        );

        // typescript configuration
        this.fs.copyTpl(
          this.templatePath('tsconfig.json'),
          this.destinationPath('tsconfig.json'),
          templateObj
        );

        // webpack
        this.fs.copyTpl(
          this.templatePath('webpack.config.js'),
          this.destinationPath('webpack.config.js'),
          templateObj
        );
    }

    install() {
        this.log(this.props);
        // make sure to overwrite gulpfile with our template before installation.
        const templateObj = {
            customerSafeName : this.props.customerSafeName,
            capitalizeCustomerSafeName : this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase())
        }
        // gulpfile
        this.fs.copyTpl(
          this.templatePath('gulpfile.js'),
          this.destinationPath('gulpfile.js'),
          templateObj
        );
        // this.installDependencies({bower: false});
    }

    end() {
        
    }

    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }
};