import Ember from 'ember';

export default Ember.Controller.extend({
    'fab-icon': "chevron-right",
    'submitted': false,
    needs: ['answer', 'application'],
    content: null,
    mycontent: function () {
        console.log(this.get('model'));
        var answers = this.get('controllers.application.content');
        if (answers) {

            console.log('answers');
            var questions = this.get('model');
            questions.forEach(function (item, index, enumerable) {
                Ember.set(item, "answer", answers[Ember.get(item, "number") - 1]);

            });
            console.log("mycontent");
            return questions;
        }
            return this.get('model');
        



    }.property('controllers.application.content'),
    actions: {
        logout: function () {
            var self = this;
            console.log(this.get('model'));
            console.log("logging out");
            this.get('session').invalidate().then(function () {

                self.transitionToRoute('login');
            })

        },

        toggleDrawer: function () {
            $('core-drawer-panel')[0].togglePanel();
        },
        submit: function () {

            if (this.get('submitted')) {
                console.log("expand");
                this.set("submitted", false);
                this.set("fab-icon", "chevron-right");
                $('.test-wrapper').css('overflow', "overlay");
                $('.question').css({
                    'top': ' -200px'
                });
                $('.answers').css({
                    'top': ' -500px'
                });
            } else {

                var self = this;
                var _response = []
                this.get('model').map(function (item, index, enumerable) {
                    console.log(item.get('question') + "!");
                    console.log($("textarea[name='" + item.get('number') + "']").val());
                    var ans = ($("textarea[name='" + item.get('number') + "']").val()).toString();
                    _response.splice(item.get('number') - 1, 0, ans);
                    return ans;
                });
                if (self.get('session.user.answerId')) {
                    console.log(self.get('session.user.answer.content'))
                    var answer = self.get('session.user.answer.content');
                    answer.set('response', _response);

                } else {

                    var answer = self.store.createRecord('answer', {
                        response: _response
                    });
                    console.log(this.get('session.userId'));
                    if (this.get('session.userId')) {
                        answer.ParseACL = {
                            owner: this.get('session.userId')
                        };
                        answer.set('user', this.get('session.user'));
                    }
                }
                answer.save().then(function () {
                    self.set('session.user.answer', answer);
                    self.set('session.user.answerId', answer.id);
                    self.get('session.user').save().then(function () {
                        console.log("shit is happening")
                    })
                    self.set('submitted',
                        'true');
                    self.set("fab-icon", "expand-less");
                    $('.test-wrapper').css('overflow', "hidden");
                    $('.question').css({
                        'top': ' 500px'
                    });
                    $('.answers').css({
                        'top': ' 50px'
                    });

                });

            }


        },

        query: function () {

        }
    }
});
