import Ember from 'ember';

export default Ember.Controller.extend({
	  needs: ['test', 'application'],
    mycontent: function () {
        console.log(this.get('model'));

        var answers = this.get('model.answer.response');
        var questions = this.get('controllers.test.model');
        console.log(questions);

        if (answers) {

            console.log('answers');
            questions.forEach(function (item, index, enumerable) {
                Ember.set(item, "answer", answers[Ember.get(item, "number")]);

            });
            console.log("mycontent");
            return questions;
        }
        return false;
    }.property('model'),
    actions: {
        goBack: function () {
            this.transitionToRoute('users');
        }
    }
});
