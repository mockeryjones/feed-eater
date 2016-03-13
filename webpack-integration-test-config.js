const path = require('path');
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;}
).forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: {
    main: './lib/bin.js'
  },
  output: {
    path: './dist',
    filename: 'feed.eater.it.js'
  },
  externals: nodeModules,
  module: {
    preLoaders:[{
        test: /\.(json)$/,
        loaders: ['json-loader']
    }],
    loaders: [{
        test: /\.(js|jsx)$/,
        target: 'node',
        loaders: ['babel?presets[]=es2015'],
        include: path.join(__dirname, 'lib'),
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  },
  devServer: {
    proxy: {
      '*': 'https://localhost:3030'
    }
  }
};
