/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var autoprefixer = require('autoprefixer-core');

var app = new EmberApp({
  postcssOptions: {
    plugins: [
      {
        module: autoprefixer,
        options: {
          browsers: ['last 2 versions']
        }
      }
    ]
  }
});

//
// Bower Dependencies
//
app.import('bower_components/tachyons-box-sizing/tachyons-box-sizing.min.css');

app.import({
  development: 'bower_components/basscss/css/basscss.css',
  production: 'bower_components/basscss/css/basscss.min.css'
});

module.exports = app.toTree();
