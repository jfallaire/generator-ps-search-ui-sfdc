'use strict';
const Table = require('cli-table');
const _ = require('underscore');

module.exports = {
    getAllRoutes: (routes) => {
        var allRoutes = [];
        routes.forEach(middleware => {
            if(middleware.route){ // routes registered directly on the app
                var method = middleware.route.stack[0].method.toUpperCase();
                allRoutes.push({method: method, path: middleware.route.path});
            } else if(middleware.name === 'router'){ // router middleware
                // gets the first part of the uri that app._router.stack forgets
                let mount = middleware.regexp.toString().match(/([\/\\\w-]+)\?/)[1];
                mount = mount.replace(/\\/g, "");
                mount = mount.replace(/\/$/, "");

                middleware.handle.stack.forEach(handler => {
                    if(handler.route){
                        var method = _.keys(handler.route.methods)[0].toUpperCase();
                        allRoutes.push({method: method, path: mount + handler.route.path});
                    }
                });
            }
        })
        return allRoutes;
    },
    hasDefaultRoute: (routes) => {
        return _.some(module.exports.getAllRoutes(routes), r => { return r.path === '/' });
    },
    printRoutes: (routes) => {
        var table = new Table({ head: ["Method", "Path"] });
        console.log('\n********************************************');
        console.log('\t\tROUTES');
        console.log('********************************************\n');

        var allRoutes = module.exports.getAllRoutes(routes);
        allRoutes.forEach(r => {
            var _o = {};
            _o[r.method]  = [ r.path ]; 	
            table.push(_o);
        });
        console.log(table.toString());
        return table;
    },
    allRoutesToHTML: routes => {
        var allRoutes = module.exports.getAllRoutes(routes);
        var listitems = '';
        allRoutes.forEach(r => {
            listitems += `<li><a target="_blank" href="${r.path}">${r.path}</li>`;
        });
        return `<html><body><ul>${listitems}</ul></body></html>`;
    }
}