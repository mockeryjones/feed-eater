/**
 * emmet
 * Copyright (c) 2015 Yieldbot, Inc. - All rights reserved.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var dir = __dirname + '/test/';


var files = fs.readdirSync(dir)  .filter(function (file) {
  return file.match(/\.js$/);
}).map( function(file) {
  return path.join(dir, file);
});

var nodeModules = {};

fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;}
).forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  'entry': {
    'main': files
  },
  'output': {
    path: './test',
    filename: '_generated_tests.js'
  },
  'externals': nodeModules,
  'module': {
    preLoaders:[{
        test: /\.(json)$/,
        loaders: ['json-loader']
    }],
    'loaders': [
      {
        tests: /\.js$/,
        target: 'node',
        exclude: /(node_modules)/,
        loaders: ['babel?presets[]=es2015'],
        include: [path.join(__dirname, 'test'),path.join(__dirname, 'lib')]
      }
    ]
  }
};
