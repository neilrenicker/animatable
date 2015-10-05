import Ember from 'ember';
import TransitionListenerMixin from 'animatable/mixins/transition-listener';

export default Ember.Mixin.create(TransitionListenerMixin, {
  defaultCssClass: 'bg-light-silver',
  positiveResponseCssClass: 'bg-yellow',
  negativeResponseCssClass: 'bg-teal',
  isPositiveResponse: Ember.computed.match('chosenResult.content', /yes/),
  isNegativeResponse: Ember.computed.match('chosenResult.content', /no/),

  _onDidInsertElement: Ember.on('didInsertElement', function() {
    this.addBodyDefaultClass();
  }),

  addBodyDefaultClass: function() {
    Ember.$('body').removeClass().addClass(this.get('defaultCssClass'));
  },

  addBodyColorClass: function() {
    let $body = Ember.$('body');

    if (this.get('isPositiveResponse')) {
      $body.removeClass().addClass(this.get('positiveResponseCssClass'));
    } else if (this.get('isNegativeResponse')) {
      $body.removeClass().addClass(this.get('negativeResponseCssClass'));
    }
  }.observes('chosenResult'),

  willTransition: function() {
    this.addBodyDefaultClass();
  }
});
