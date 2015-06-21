import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['relative'],
  query: '',
  inputHasFocus: false,

  searchResults: Ember.computed('query', 'dataSet', function() {
    var query = this.get('query');

    var regex = new RegExp(query, 'i');
    return this.get('dataSet').filter(function(result) {
      return result.get('name').match(regex);
    });
  }),

  actions: {
    inputFocused: function() {
      this.set('inputHasFocus', true)
    },

    inputUnfocused: function() {
      this.set('inputHasFocus', false)
    }
  }
});
