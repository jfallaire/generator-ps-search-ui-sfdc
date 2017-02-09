const webpack = require('webpack');
const minimize = process.argv.indexOf('--minimize') !== -1;
const failPlugin = require('webpack-fail-plugin');
const cfg = require('./config');

// Fail plugin will allow the webpack ts-loader to fail correctly when the TS compilation fails
var plugins = [failPlugin];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
      // {test: /\.scss$/, loaders: ['sass']}
    ]
  },
  // sassLoader: {
  //   includePaths: ['./sass']
  // },
  plugins: plugins,
  bail: true
};

module.exports = Object.assign({}, commonConfig, cfg.<%= customerSafeName %>.webpack_config[process.env.CUSTOM_BUNDLE]);