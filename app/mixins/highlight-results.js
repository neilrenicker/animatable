import Ember from 'ember';

export default Ember.Mixin.create({
  // Observers

  highlightedResultWillChange: function() {
    let highlightedResult = this.get('highlightedResult');
    if (!highlightedResult) { return; }

    highlightedResult.set('isHighlighted', false);
  }.observesBefore('highlightedResult'),

  highlightedResultChanged: function() {
    let highlightedResult = this.get('highlightedResult');
    if (!highlightedResult) { return; }

    highlightedResult.set('isHighlighted', true);
  }.observes('highlightedResult'),

  // Internal Functions

  highlightFirstResult: function() {
    this.set('highlightedResult', this.get('results').objectAt(0));
  },

  highlightPreviousResult: function() {
    let results = this.get('results');
    let highlightedResult = this.get('highlightedResult');
    let highlightedResultIndex = results.indexOf(highlightedResult);

    if (highlightedResult === results.get('firstObject')) {
      return highlightedResult;
    }

    this.set('highlightedResult',
      results.objectAt(highlightedResultIndex - 1));
  },

  highlightNextResult: function() {
    let results = this.get('results');
    let highlightedResult = this.get('highlightedResult');
    let highlightedResultIndex = results.indexOf(highlightedResult);

    if (highlightedResult === results.get('lastObject')) {
      return highlightedResult;
    }

    this.set('highlightedResult',
      results.objectAt(highlightedResultIndex + 1));
  },
});
