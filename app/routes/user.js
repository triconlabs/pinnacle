import Ember from 'ember';

export default Ember.Route.extend({
    afterModel: function() {
        console.log("user beforeModel");
        console.log(this.store.all('question'));
        if (!this.store.all('question')) {
            this.transitionToRoute('test');
        }
    }
});
