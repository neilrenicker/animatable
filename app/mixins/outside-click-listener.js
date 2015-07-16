import Ember from 'ember';

export default Ember.Mixin.create({
  outsideElementSelector: 'html',
  outsideClick: Ember.K,

  click: function(event) {
    return event.stopPropagation();
  },

  setupEventHandlers: function() {
    Ember.run.next((function(_this) {
      return function() {
        if (_this.clickHandler || !_this.get('element')) {
          return;
        }

        _this.clickHandler = function() {
          Ember.run(function() {
            return _this.outsideClick();
          });
        };

        Ember.$(
          _this.get('outsideElementSelector')
        ).on('click', _this.clickHandler);
      }
    })(this));
  }.on('didInsertElement'),

  removeEventHandlers: function() {
    Ember.$(
      this.get('outsideElementSelector')
    ).off('click', this.clickHandler);

    return this.clickHandler = null;
  }.on('willDestroyElement')
});
