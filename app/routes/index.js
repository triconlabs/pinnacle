import Ember from 'ember';

export default Ember.Route.extend({
		redirect: function() {
		Ember.Logger.log("IndexRoute");

		this.transitionTo('login');
	}
});
