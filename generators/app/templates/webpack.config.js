const webpack = require('webpack');
const minimize = process.argv.indexOf('--minimize') !== -1;
const cfg = require('./config');

var plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var commonConfig = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: plugins,
  bail: true
};

module.exports = Object.assign({}, commonConfig, cfg.<%= customerSafeName %>.webpack_config[process.env.CUSTOM_BUNDLE]);