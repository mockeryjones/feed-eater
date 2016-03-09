const path = require('path');
var fs = require('fs');

var nodeModules = {};

fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;}
).forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = (options) => {
  return {
    entry: {
      main: './lib/main.js'
    },
    output: {
      path: './dist',
      filename: 'feed.eater.js'
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
          loader: options.hotComponents ? 'babel?presets[]=es2015' : 'babel?presets[]=es2015',
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
};
