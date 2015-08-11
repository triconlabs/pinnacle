import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
    model: function() {
    	console.log()
        return this.store.find('todo');
    }
});
