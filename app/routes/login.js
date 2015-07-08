import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function (argument) {
    	console.log("session");
    	console.log(this.get('session.isAuthenticated'));
        
        if (this.get('session.isAuthenticated')) {
            // do stuff with the user
            this.transitionTo('test')
        }
    }
});
