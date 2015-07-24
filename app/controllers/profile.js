import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],
    gender: function(argument) {
        if (this.get('model.gender') == 'Male') {
            return true;
        } else {
            return false;
        }
    }.property('model.gender'),
    actions: {

    }
});
