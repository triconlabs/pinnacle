import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
    model: function () {
        console.log("question route");
        this.store.findAll('question').then(function(model){
        	return model
        })
    }
});
