

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
        if(this.options.customer){
            this.props.customer = this.options.customer;
        }
        this.props.root = this.options.root || process.cwd();
    }

    _askFor() {
        const prompts = [{
            type: 'input',
            name: 'customer',
            message: 'Your customer (project) name?',
            default: path.basename(process.cwd()),
            when: !this.props.customer
        }];
        return this.prompt(prompts).then(props => {
            this.props = extend(this.props, props);
            this.props.repoName = utils.makeRepoName(this.props.customer);
            this.props.destinationRoot = path.join(this.props.root, this.props.repoName);
            this.props.customerSafeName = _.camelCase(this.props.customer);
        });
    }

    prompting() {

        if(!this.props.customer){
            // Have Yeoman greet the user.
            this.log(yosay(
                'Welcome to the fabulous ' + chalk.red('ps-search-ui-sfdc') + ' generator!'
            ));
        }
        return this._askFor();

    }

    default () {
        if (path.basename(this.destinationPath()) !== this.props.repoName) {
            this.log(
                'You must be inside a folder named ' + this.props.repoName + '\n' +
                'I\'ll automatically create this folder.'
            );
            mkdirp(this.props.repoName);
        }
        this.destinationRoot(this.props.destinationRoot);
        
        const readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));
        this.composeWith(require.resolve('generator-node/generators/app'), {
            babel: false,
            boilerplate: false,
            name: this.props.repoName,
            projectRoot: this.props.repoName,
            skipInstall: this.options.skipInstall,
            readme: readmeTpl({
                repoName: this.props.repoName
            })
        });

        this.composeWith(require.resolve('../config'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../typescript'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../sass'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../routes'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../vendor'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../views'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../sfdc'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });

        this.composeWith(require.resolve('../utils'), {
            customer: this.props.customer,
            destinationRoot: this.props.destinationRoot
        });
    }

    writing() {
        this.destinationRoot(this.props.destinationRoot);
        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        const templatePkg = this.fs.readJSON(this.templatePath('package.json'), {});
        const templateObj = extend({}, this.props, {
            capitalizeCustomerSafeName: this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase())
        });

        extend(pkg, {
            dependencies: templatePkg.dependencies,
            devDependencies: templatePkg.devDependencies,
            keywords: templatePkg.keywords,
            main: templatePkg.main,
            engines: templatePkg.engines,
            eslintConfig: templatePkg.eslintConfig
        });

        // overwrite default scripts by template ones
        pkg.scripts = templatePkg.scripts
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        // make sure template variables are getting replaced.
        this.fs.copyTpl(
            this.destinationPath('package.json'),
            this.destinationPath('package.json'),
            templateObj
        )

        // Copy all dotfiles
        this.fs.copyTpl(
            this.templatePath('.*'),
            this.destinationRoot()
        );

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

        // passports.js
        this.fs.copyTpl(
            this.templatePath('passports.js'),
            this.destinationPath('passports.js'),
            templateObj
        );

        // middleware.js
        this.fs.copyTpl(
            this.templatePath('middleware.js'),
            this.destinationPath('middleware.js'),
            templateObj
        );
        // server.js
        this.fs.copyTpl(
            this.templatePath('server.js'),
            this.destinationPath('server.js'),
            templateObj
        );

        // below files are required for azure deployment
        // TODO: add options in yeoman to prompt question if this project will be deployed to azure or not  
        this.fs.copyTpl(
            this.templatePath('web.config'),
            this.destinationPath('web.config'),
            templateObj
        );
        this.fs.copyTpl(
            this.templatePath('iisnode.yml'),
            this.destinationPath('iisnode.yml'),
            templateObj
        );
    }

    install() {
        this.log(this.props);
        // make sure to overwrite gulpfile with our template before installation.
        const templateObj = {
            customerSafeName: this.props.customerSafeName,
            capitalizeCustomerSafeName: this.props.customerSafeName.replace(/\b\w/g, l => l.toUpperCase())
        }
        // gulpfile
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            templateObj
        );
        // this.installDependencies({
        //   npm: false,
        //   bower: false,
        //   yarn: true
        // });
    }

    end() {

    }

    // method1() {
    //     this.log('method 1 just ran');
    // }

    // method2() {
    //     this.log('method 2 just ran');
    // }
};