import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
	model : function  () {
		return this.controllerFor("application").get("user");
	}
});
