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
        updateSession: function() {
            console.log("updateSession");
            
            var key = this.get('session.sessionStoreKey'),
                user = this.get('controllers.application.user'),
                adapter = this.store.adapterFor('application');
            
            console.log(user);
            var sessionData = {
                userId: user.id,
                sessionToken: this.get('session.sessionToken'),
                _response: user._data
            };


            console.log(key);
            console.log(sessionData);
            console.log(sessionData._response);

            this.setProperties(sessionData);
            this.get('session.sessionStore').save(key, sessionData);

            // Set adapter properties
            delete sessionData._response;
            adapter.setProperties(sessionData);
        }
    }
});
