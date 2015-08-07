import DS from 'ember-data';
import config from 'animatable/config/environment';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    if (config['ember-cli-mirage'].enabled) {
      return this._super(store, type, payload);
    }

    payload = { properties: payload.tables[0].results };

    return this._super(store, type, payload);
  },

  normalize: function(typeClass, hash, prop) {
    if (config['ember-cli-mirage'].enabled) {
      return this._super(typeClass, hash, prop);
    }

    hash = {
      id: hash["animations_link/_text"],
      name: hash["animations_link/_text"],
      content: hash.animations_content,
      sourceUrl: hash.animations_link
    };

    return this._super(typeClass, hash, prop);
  }
});
