/* jshint node: true */
var apiKeys = require('../api-keys');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'animatable',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    'ember-devtools': {
      global: true,
      enabled: environment === 'development'
    },
    'ember-cli-mirage': {
      enabled: environment !== 'production'
    },

    APP: {
      IMPORT_IO_HOST: 'https://api.import.io/store/connector/_magic',
      MOZILLA_PROPERTIES_URL:
        'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties?raw&macros',
      IMPORT_IO_USER_ID: apiKeys.importIoUserId,
      IMPORT_IO_API_KEY: apiKeys.importIoApiKey
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.NAMESPACE = 'api';
  }

  if (environment === 'test') {
    // Testem prefers this
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // Keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
