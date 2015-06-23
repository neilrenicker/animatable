import Ember from 'ember';

export default Ember.Controller.extend({
  isPositiveResponse: Ember.computed.match('selectedResult.content', /yes/),
  isNegativeResponse: Ember.computed.match('selectedResult.content', /no/)
});
