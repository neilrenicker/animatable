import Ember from 'ember';

export default Ember.Component.extend({
  query: null,

  searchResults: Ember.computed('query', 'dataSet', function() {
    var query = this.get('query');
    if (!query) { return };

    var regex = new RegExp(query, 'i');
    return this.get('dataSet').filter(function(result) {
      return result.get('name').match(regex);
    });
  })
});
