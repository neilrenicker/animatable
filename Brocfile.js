/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//
// Bower Dependencies
//
app.import('bower_components/tachyons-box-sizing/tachyons-box-sizing.min.css');

app.import({
  development: 'bower_components/basscss/css/basscss.css',
  production: 'bower_components/basscss/css/basscss.min.css'
});

module.exports = app.toTree();
