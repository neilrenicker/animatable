import Ember from 'ember';

export default Ember.Controller.extend({
  isPositiveResponse: Ember.computed.match('chosenResult.content', /yes/),
  isNegativeResponse: Ember.computed.match('chosenResult.content', /no/)
});
