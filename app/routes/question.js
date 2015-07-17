import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
    model: function () {
        console.log("question route");
       return this.store.findAll('question',{"order" : "number"}).then(function(model){
        	return model
        })
    }
});
