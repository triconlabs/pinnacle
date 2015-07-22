import Ember from 'ember';

export default Ember.Controller.extend({

	gender : function  (argument) {
		if(this.get('model.gender') == 'Male'){
			return true;
		}else{
			return false;
		}
	}.property('model.gender')
});
