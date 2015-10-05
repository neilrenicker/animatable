import Ember from 'ember';

export default Ember.Mixin.create({
  willTransition: Ember.K,

  _setupTransitionListener: Ember.on('didInsertElement', function() {
    let router = this.get('container').lookup('router:main');

    this._willTransitionHandler = Ember.run.bind(this, this.willTransition);
    router.on('willTransition', this._willTransitionHandler);
  }),

  _removeTransitionListener: Ember.on('willDestroyElement', function() {
    let router = this.get('container').lookup('router:main');

    router.off('willTransition', this._willTransitionHandler);
    this._willTransitionHandler = null;
  })
});
