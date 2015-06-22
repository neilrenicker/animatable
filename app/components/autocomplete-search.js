import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['relative'],
  query: '',
  inputHasFocus: false,
  selectedResult: null,

  searchResults: Ember.computed('query', 'dataSet', function() {
    var query = this.get('query');

    var regex = new RegExp(query, 'i');
    return this.get('dataSet').filter(function(result) {
      return result.get('name').match(regex);
    });
  }),

  _setSelectedResult: function() {
    if (this.get('searchResults')) {
      this.set('selectedResult', this.get('searchResults').objectAt(0))
    }
  },

  actions: {
    inputFocused: function() {
      this.set('inputHasFocus', true)
    },

    inputUnfocused: function() {
      this.set('inputHasFocus', false)
    },

    formSubmitted: function() {
      this._setSelectedResult()
      this.set('inputHasFocus', false)
    }
  }
});
