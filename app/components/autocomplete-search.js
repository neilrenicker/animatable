import Ember from 'ember';
import HighlightResultsMixin from 'animatable/mixins/highlight-results';
import OutsideClickListener from 'animatable/mixins/outside-click-listener';

export default Ember.Component.extend(HighlightResultsMixin,
  OutsideClickListener, {
  classNames: ['relative'],
  query: '',
  shouldDisplayResults: false,

  results: Ember.computed('query', 'data', function() {
    let query = this.get('query');

    if (!query) {
      return this.get('data');
    }

    let regex = new RegExp(query, 'i');
    return this.get('data').filter(function(result) {
      return result.get('name').match(regex);
    });
  }),

  bindKeyEvents: function() {
    Ember.$(document).on('keydown', (e) => {
      Ember.run.next( () => {
        switch (e.keyCode) {
          case 9: // tab key
          case 13: // enter key
            return;
          case 27: // escape key
            this.set('shouldDisplayResults', false);
            break;
          case 38: // up arrow key
            this.highlightPreviousResult();
            break;
          case 40: // down arrow key
            this.highlightNextResult();
            break;
          default:
            this.enterSearchMode();
        }
      });
    });
  },

  unBindKeyEvents: function() {
    Ember.$(document).off('keydown');
  },

  outsideClick: function() {
    if (!this.get('shouldDisplayResults')) {
      // Don't do anything with the outside click until
      // the results box is active
      return;
    }

    this.set('shouldDisplayResults', false);
  },

  enterSearchMode: function() {
    this.highlightFirstResult();
    this.set('shouldDisplayResults', true);
  },

  setChosenResult: function(result) {
    this.set('chosenResult', result);
    this.set('query', this.get('chosenResult.name'));
    this.set('shouldDisplayResults', false);
  },

  didInsertElement: function() {
    this.set('chosenResult', null);
  },

  willDestroyElement: function() {
    this.unBindKeyEvents();
  },

  actions: {
    inputFocused: function() {
      this.enterSearchMode();
      this.bindKeyEvents();
    },

    inputUnfocused: function() {
      this.unBindKeyEvents();
    },

    formSubmitted: function() {
      let highlightedResult = this.get('highlightedResult');

      if (!highlightedResult) {
        return;
      }

      this.setChosenResult(highlightedResult);
    },

    resultClicked: function(result) {
      this.setChosenResult(result);
    }
  }
});
