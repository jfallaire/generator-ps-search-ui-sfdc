# generator-ps-search-ui-sfdc

[![Build Status](https://travis-ci.org/jfallaire/generator-ps-search-ui-sfdc.svg?branch=master)](https://travis-ci.org/jfallaire/generator-ps-search-ui-sfdc) [![npm version](https://badge.fury.io/js/generator-ps-search-ui-sfdc.svg)](https://badge.fury.io/js/generator-ps-search-ui-sfdc)

> ps-search-ui-sfdc generator generating a nodejs module as development environment to interact with the Coveo JS Search UI framework

![Solutions Specialist, you've been served!](https://i.imgflip.com/1jaox9.jpg)


## Getting started

- Install: `npm install -g generator-ps-search-ui-sfdc`
- Run: `yo ps-search-ui-sfdc`


## Commands

* `yo ps-search-ui-sfdc` shows a wizard for generating a new nodejs module specific for a customer


## What do you get?

Scaffolds out a complete generator directory structure for you:

```
<CustomerName>-search-ui
├── LICENSE
├── README.md
├── config
│   ├── config.development.js
│   ├── config.global.js
│   ├── config.production.js
│   ├── config.uat.js
│   └── index.js
├── gulpTasks
│   ├── compile.js
│   ├── css.js
│   ├── dev.js
│   ├── prettify.js
│   ├── setup.js
│   └── sfdc.js
├── gulpfile.js
├── iisnode.yml
├── middleware.js
├── package.json
├── passports.js
├── public
│   ├── css
│   ├── image
│   ├── js
│   └── vendor
├── routes
│   ├── authentication.js
│   ├── errors.js
│   └── pages.js
├── sass
│   ├── AgentBox.scss
│   ├── PilotSearch.scss
│   └── ui
├── server.js
├── sfdc
│   ├── aura
│   ├── components
│   └── pages
├── src
│   ├── Index.ts
│   ├── SwapVar.ts
│   ├── <CustomerName>Core.ts
│   ├── custo
│   ├── events
│   ├── ui
│   └── utils
├── tsconfig.json
├── utils
│   ├── cloudplatformAPI.js
│   ├── routesUtils.js
│   └── sessionUtils.js
├── vendor
│   ├── coveo
│   ├── coveo-lightning
│   ├── coveo-ps
│   ├── salesforce
│   └── salesforce-ux
├── views
│   ├── pages
│   └── partials
├── web.config
└── webpack.config.js
```

Refer to [our documentation](http://yeoman.io/authoring/) to learn more about creating a Yeoman generator.
