import Ember from 'ember';

export default Ember.Controller.extend({
	needs : ['test'],
	actions : {
		post : function  (argument) {
			console.log($("textarea[name=question]").val())
			var question = this.store.createRecord('question' , {question : ($("textarea[name=question]").val()).toString() , number : 7 , show : true});
			question.save().then(function(){
				alert("successfully added question");
			})
		}
	}
});
