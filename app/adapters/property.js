import Ember from 'ember';
import DS from 'ember-data';
import config from 'animatable/config/environment';

export default DS.RESTAdapter.extend({
  importIoHost: config.APP.IMPORT_IO_HOST,
  mozillaPropertiesUrl: encodeURIComponent(config.APP.MOZILLA_PROPERTIES_URL),
  importIoUserId: config.APP.IMPORT_IO_USER_ID,
  importIoApiKey: config.APP.IMPORT_IO_API_KEY,

  // namespace is used in development to direct requests to the mirage server
  namespace: config.APP.NAMESPACE,

  findAll(store, type, sinceToken) {
    if (config['ember-cli-mirage'].enabled) {
      return this._super(store, type, sinceToken);
    }

    return new Ember.RSVP.Promise((resolve, reject) => {
      let url = this.buildUrl();

      Ember.$.ajax(url).then(response => {
        resolve(response);
      }, () => {
        reject();
      });
    });
  },

  buildUrl() {
    return `${ this.get('importIoHost') }?url=${ this.get('mozillaPropertiesUrl') }&js=false&_user=${ this.get('importIoUserId') }&_apikey=${ this.get('importIoApiKey') }`;
  }
});
