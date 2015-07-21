import Ember from 'ember';

export default Ember.Controller.extend({
  defaultCssClass: 'bg-light-silver',
  positiveResponseCssClass: 'bg-yellow',
  negativeResponseCssClass: 'bg-teal',
  isPositiveResponse: Ember.computed.match('chosenResult.content', /yes/),
  isNegativeResponse: Ember.computed.match('chosenResult.content', /no/),

  init: function() {
    Ember.$('body').addClass(this.get('defaultCssClass'));
  },

  addBodyColorClass: function() {
    let negativeClass = this.get('negativeResponseCssClass');
    let positiveClass = this.get('positiveResponseCssClass');
    let $body = Ember.$('body');

    // Always remove the default body class if any response is detected
    $body.removeClass(this.get('defaultCssClass'));

    if (this.get('isPositiveResponse')) {
      $body.removeClass(negativeClass).addClass(positiveClass);
    } else if (this.get('isNegativeResponse')) {
      $body.removeClass(positiveClass).addClass(negativeClass);
    }
  }.observes('isPositiveResponse', 'isNegativeResponse')
});
