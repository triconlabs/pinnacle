import Ember from 'ember';

export default Ember.Controller.extend({
    'fab-icon': "chevron-right",
    'submitted': false,
    'question': "question1",
    needs: ['answer', 'application'],
    content: null,
    formattedTime: function () {
        var dateB = moment();
        var time = this.get('controllers.application.model.updatedAt')
        var dateC = moment(time);

        console.log(dateC.from(dateB));
        return dateC.from(dateB);
    }.property('controllers.application.model.updatedAt'),
    mycontent: function () {
        console.log(this.get('model'));

        var answers = this.get('controllers.application.model.response');
        console.log(answers);
        var questions = this.get('model');

        if (answers) {

            console.log('answers');
            questions.forEach(function (item, index, enumerable) {
                Ember.set(item, "answer", answers[Ember.get(item, "number")]);

            });
            console.log("mycontent");
            return questions;
        }
        return this.get('model');
    }.property('controllers.application.model'),
    actions: {
        logout: function () {
            var self = this;
            var file = $('#upload')[0].files[0];
            var serverUrl = 'https://api.parse.com/1/files/' + file.name;

            $.ajax({
                type: "POST",
                beforeSend: function (request) {
                    request.setRequestHeader("X-Parse-Application-Id", 'IrcvQfurruulfg3GMOFV9f2pESsBwcJ18wTlc850');
                    request.setRequestHeader("X-Parse-REST-API-Key", '7erEDPfMmoxik96OICRjSzBBxkWoYYt1drZ1ZYo8');
                    request.setRequestHeader("Content-Type", file.type);
                },
                url: serverUrl,
                data: file,
                processData: false,
                contentType: false,
                success: function (data) {


                    self.set('session.user.image', data.url);
                    console.log(self.get('session.sessionStore'));
                    //console.log(self.get('session.sessionStore'));
                    self.get('session.user').save().then(function (model) {


                    })
                },
                error: function (data) {
                    var obj = jQuery.parseJSON(data);
                    alert(obj.error);
                }
            });


        },

        toggleDrawer: function () {
            $('core-drawer-panel')[0].togglePanel();
        },
        answer: function () {
            var self = this;


            if (this.get('submitted')) {
                self.send('submit');
            } else {

                var user = this.get('session.user');
                var _response = []
                this.get('model').map(function (item, index, enumerable) {
                    console.log(item.get('question') + "!");
                    console.log($("textarea[name='" + item.get('number') + "']").val());
                    var ans = ($("textarea[name='" + item.get('number') + "']").val()).toString();
                    _response.splice(item.get('number'), 0, ans);
                    return ans;
                });



                if (user.get('answerId')) {
                    console.log("answerId is present")
                    var answer = this.get('controllers.application.model')
                    console.log(answer);
                    answer.set('response', [])
                    _response.forEach(function (item, index, enumerable) {

                        answer.get('response').push(item);

                    });
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
                console.log(answer.get('response'));
                answer.save().then(function () {
                    self.set('session.user.answer', answer);
                    self.set('session.user.submitted', true);
                    self.set('session.user.answerId', answer.id);
                    self.get('session.user').save().then(function () {
                        console.log("shit is happening");
                    })
                    console.log($('.answers').height());
                    self.set('submitted',
                        'true');
                    self.set("fab-icon", "expand-less");
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
        submit: function () {
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
