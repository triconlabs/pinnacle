import Ember from 'ember';

export default Ember.Controller.extend({
    'fab-icon': "chevron-right",
    'submitted': false,
    'question': "question1",
    'z': 4,
    needs: ['answer', 'application'],
    content: null,
    formattedTime: function() {
        var dateB = moment();
        var time = this.get('controllers.application.model.updatedAt')
        var dateC = moment(time);

        console.log(dateC.from(dateB));
        return dateC.from(dateB);
    }.property('controllers.application.model.updatedAt'),
    mycontent: function() {
        console.log("mycontent test route");

        var answers = this.get('controllers.application.model.asdf');
        console.log(this.get('controllers.application.model.asdf'));
        var questions = this.get('model');

        if (answers) {

            console.log('answers');
            questions.forEach(function(item, index, enumerable) {
                console.log(Ember.get(item, "id"));
                if (answers[Ember.get(item, "id")]) {

                    Ember.set(item, "answer", answers[Ember.get(item, "id")]);
                } else {
                    Ember.set(item, "answer", "");
                }

            });

            return questions;
        }
        return this.get('model');
    }.property('controllers.application.model'),
    actions: {


        toggleDrawer: function() {
            $('core-drawer-panel')[0].togglePanel();
        },
        answer: function() {
            var _this = this;


            if (this.get('submitted')) {
                _this.send('submit');
            } else {

                var user = this.get('session.user');

                // answers response as array . Used previously .
                /*     var _response = []
                    this.get('model').map(function(item, index, enumerable) {
                       console.log(item.get('question') + "!");
                      console.log($("textarea[name='" + item.get('number') + "']").val());
                     var ans = ($("textarea[name='" + item.get('number') + "']").val()).toString();
                    _response.splice(item.get('number'), 0, ans);
                   return ans;
                });*/


                var a = {};
                this.get('model').map(function(item, index, enumerable) {
                    if (item.get('show')) {

                        var ans = ($("textarea[name='" + item.get('id') + "']").val()).toString();
                        a[item.get('id')] = ans;
                        return ans;
                    }
                });

                if (user.get('answerId')) {
                    console.log("answerId is present");
                    var answer = this.get('controllers.application.model')
                    answer.set('asdf', a);
                    console.log(answer);
                } else {

                    console.log("answerId absent");
                    var answer = _this.store.createRecord('answer', {
                        asdf: a
                    });

                    if (this.get('session.userId')) {
                        answer.ParseACL = {
                            owner: this.get('session.userId'),
                            role: 'Moderators'
                        };
                        answer.set('user', this.get('session.user'));
                    }
                    console.log(answer);
                }

                console.log("saving answer");
                answer.save().then(function() {
                    $('#toast').attr('text', 'answer saved');
                    Ember.$('#toast')[0].show();
                    _this.set('session.user.answer', answer);
                    _this.set('session.user.submitted', true);
                    _this.set('session.user.answerId', answer.id);
                    _this.get('session.user').save().then(function() {
                        console.log("user updated");
                        Ember.$('#toast')[0].show();
                    })
                    _this.set('submitted',
                        'true');
                    _this.set("fab-icon", "expand-less");
                    $('.test-wrapper').css('overflow', 'hidden');
                    $('.question').css({
                        'top': $('body').height() - 420 + 'px'
                    });
                    $('.answers').css({
                        'top': ' 0px'
                    });


                });

            }
        },
        submit: function() {
            console.log("expand");
            this.set("submitted", false);
            this.set("fab-icon", "chevron-right");
            $('.test-wrapper').css('overflow', 'overlay');
            $('.question').css({
                'top': ' -200px'
            });
            $('.answers').css({
                'top': ' -500px'
            });

        }
    }
});
