var config = module.exports = {};
const minimize = process.argv.indexOf('--minimize') !== -1;
const path = require('path');

config.env = 'development';
config.enableImpersonateUser = false;
config.hostname = 'dev.example.com';
config.server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
config.server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

config.iow_path = '';

// coveo
config.coveo = {};
config.coveo.rest_uri = 'https://platform.cloud.coveo.com/rest/search';
config.coveo.cloud_platform_host = 'platform.cloud.coveo.com';
config.coveo.cloud_platform_uri = 'https://cloudplatform.coveo.com/rest';
config.coveo.ops_identity = {
    'name': '<%= authorEmail %>',
    'provider': 'Email Security Provider'
};
config.coveo.filter = '';

// custom
config.<%= customerSafeName %> = {};
config.<%= customerSafeName %>.webpack_config = {};

var commonWebpackConfig = {
    entry: {
        // 'Coveo.<%= capitalizeCustomerSafeName %>.Lazy' : ['./src/Lazy.ts'],
        // 'Coveo.<%= capitalizeCustomerSafeName %>' : ['./src/Eager.ts'],
        'Coveo.<%= capitalizeCustomerSafeName %>': ['./src/Index.ts']
    },
    output: {
        path: path.resolve('./bin/js'),
        filename: minimize ? '[name].min.js' : '[name].js',
        chunkFilename: minimize ? '[name].min.js' : '[name].js',
        libraryTarget: 'umd',
        // See SwapVar.ts as for why this need to be a temporary variable
        library: 'CoveoExtension',
        publicPath: '/js/'
    }
}

// webpack config for support bundle
config.<%= customerSafeName %>.webpack_config.support = Object.assign({}, commonWebpackConfig, {
    output: Object.assign({}, commonWebpackConfig.output, {
        path: path.resolve('./bin/js') 
    })
});
