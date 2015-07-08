import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function (transition) {
        
        if (this.get('session.isAuthenticated')) {
            // do stuff with the user
            this.transitionTo(transition)
        } else {

            this.transitionTo('login');
        }
    }
});
