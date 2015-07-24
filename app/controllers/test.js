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
        console.log(this.get('model'));

        var answers = this.get('controllers.application.model.response');
        console.log(answers);
        var questions = this.get('model');

        if (answers) {

            console.log('answers');
            questions.forEach(function(item, index, enumerable) {
                Ember.set(item, "answer", answers[Ember.get(item, "number")]);

            });
            console.log("mycontent");
            return questions;
        }
        return this.get('model');
    }.property('controllers.application.model'),
    actions: {
        logout: function() {
            var _this = this;
            var file = $('#upload')[0].files[0];
            var serverUrl = 'https://api.parse.com/1/files/' + file.name;

            $.ajax({
                type: "POST",
                beforeSend: function(request) {
                    request.setRequestHeader("X-Parse-Application-Id", 'IrcvQfurruulfg3GMOFV9f2pESsBwcJ18wTlc850');
                    request.setRequestHeader("X-Parse-REST-API-Key", '7erEDPfMmoxik96OICRjSzBBxkWoYYt1drZ1ZYo8');
                    request.setRequestHeader("Content-Type", file.type);
                },
                url: serverUrl,
                data: file,
                processData: false,
                contentType: false,
                success: function(data) {


                    _this.set('session.user.image', data.url);

                    console.log(_this.get('session.sessionStore'));
                    //console.log(_this.get('session.sessionStore'));
                    _this.get('session.user').save().then(function(model) {
                        var key = _this.get('session.sessionStoreKey'),
                            user = _this.get('controllers.application.user');



                        console.log(user.get('gender'));


                        var args = JSON.parse(localStorage[key]);
                        args._response.image = user.get('image');
                        localStorage.setItem(key, JSON.stringify(args));

                    })
                },
                error: function(data) {
                    var obj = jQuery.parseJSON(data);
                    alert(obj.error);
                }
            });


        },

        toggleDrawer: function() {
            $('core-drawer-panel')[0].togglePanel();
        },
        answer: function() {
            var _this = this;


            if (this.get('submitted')) {
                _this.send('submit');
            } else {

                var user = this.get('session.user');
                var _response = []
                this.get('model').map(function(item, index, enumerable) {
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
                    _response.forEach(function(item, index, enumerable) {

                        answer.get('response').push(item);

                    });
                } else {
                    var answer = _this.store.createRecord('answer', {
                        response: _response
                    });
                    console.log(this.get('session.userId'));
                    if (this.get('session.userId')) {
                        answer.ParseACL = {
                            owner: this.get('session.userId'),
                            role: 'Moderators'
                        };
                        answer.set('user', this.get('session.user'));
                    }

                }
                console.log(answer.get('response'));
                answer.save().then(function() {
                    _this.set('session.user.answer', answer);
                    _this.set('session.user.submitted', true);
                    _this.set('session.user.answerId', answer.id);
                    _this.get('session.user').save().then(function() {
                        console.log("shit is happening");
                    })
                    console.log($('.answers').height());
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
