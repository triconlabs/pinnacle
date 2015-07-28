import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['test', 'application'],
    mycontent: function() {
        console.log(this.get('model'));

        var answers = this.get('model.answer.asdf'),
            _this = this;
        if (this.get('controllers.test.model')) {

            var questions = this.get('controllers.test.model');
            if (answers) {

                console.log('answers');
                questions.forEach(function(item, index, enumerable) {
                    Ember.set(item, "userAnswer", answers[Ember.get(item, "id")]);

                });
                console.log("mycontent");
                return questions;
            }
        } else {
            this.store.find('question').then(function(questions) {
                _this.set('controllers.test.model' , questions);

            })
        }
        console.log(questions);

        return false;
    }.property('model' , 'controllers.test.model'),
    actions: {
        goBack: function() {
            this.transitionToRoute('users');
        }
    }
});
