'use strict';
var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var request = require('request');
var server = express();
var cfg = require('../config');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');
var gulp = require('gulp');
var path = require('path');

gulp.task('dev', ['css', 'setup', 'watch'], function (done){
    // set the view engine to ejs
    server.set('view engine', 'ejs');

    server.use(express.static(path.resolve('./bin')));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // Search page
    server.get('/community-search', function(req, res) {
        res.render('pages/community-search', { 
            prototypeTitle : 'Community Search Prototype',
            config: cfg });
    });

    server.get('/agent-box', function(req, res) {
        res.render('pages/agent-box', { 
            prototypeTitle : 'Agent Insight Panel',
            config: cfg
        });
    });

    server.get('/agent-full-search', function(req, res) {
        res.render('pages/agent-full-search', { 
            prototypeTitle : 'Agent Full Search',
            config: cfg
        });
    });

    server.listen(cfg.server_port, cfg.server_ip_address, function () {
        console.log( 'Listening on ' + cfg.server_ip_address + ', port ' + cfg.server_port )
    });

    webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:3001/');
    const compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
        hot:true,
        historyApiFallback: true,
        contentBase: 'bin/',
        publicPath: '/js/',
        compress: true,
        proxy: {
            '*': 'http://' + cfg.server_ip_address + ':' + cfg.server_port
        }
    }).listen(3001, cfg.server_ip_address, function (err, result){
        if(err){
            console.log(err);
        }
        console.log('Listening at ' + cfg.server_ip_address + ':3001' )
    });
    done();
});