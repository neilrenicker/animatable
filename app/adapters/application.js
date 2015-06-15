import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  // TODO: make this namespace dynamic based on settings in
  // environment.js
  namespace: 'api'
});
