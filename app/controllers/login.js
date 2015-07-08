import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['answer', 'application'],
    email: "",
    password: "",
    username: "",
    showFab: function () {
        console.log("fabbing");
        if (this.get('username') && this.get('password')) {
            $('paper-fab').attr('showing', true);

        } else {
            $('paper-fab').removeAttr('showing');
        }
    }.observes('username', 'password'),
    actions: {
        signup: function () {
            $('paper-input-decorator').attr('error', 'required information');

            if (!this.get('username')) {

                $('paper-input-decorator')[0].isInvalid = true;
            } else if (!this.get('password')) {

                $('paper-input-decorator')[1].isInvalid = true
            } else if (!this.get('email')) {

                $('paper-input-decorator')[2].isInvalid = true
            } else if (!input.validity.valid) {
                $('paper-input-decorator').attr('error', 'singup with your tricon infotech mail-id');
                $('paper-input-decorator')[2].isInvalid = true
            } else {
                var self = this;
                this.get('session').signup({
                    username: this.get('username'),
                    password: this.get('password'),
                    email: this.get('email')
                }).then(function (user) {
                    console.log(user);
                    self.send('login');
                }).catch(function (reason) {
                    var err = `Code ${reason.errors[0].code}: ${reason.errors[0].details}`;
                    console.error(err);
                    this.set('authError', err);
                });

            }


        },
        showMe: function () {
            $('core-collapse').toggle()
        },
        login: function () {
            var self = this;
            this.get('session').authenticate(this.get('username'), this.get('password')).then(function (user) {
                console.log(user);
                self.send('getAnswers');
            }).catch(function (error) {
                console.log("not logged in");
                console.log(error);
                if (error.responseJSON.code == 101) {
                    $('paper-input-decorator').attr('error', 'incorrect credentials');
                    $('paper-input-decorator')[1].isInvalid = true
                }
            })
        },
        getAnswers: function () {

            var self = this;
            console.log("getAnswers");
            this.store.all('user').filter(function (model) {
                if(model.get('id') == self.get('session.userId')){
                    console.log(model)
                    self.set('controllers.application.user' , model);
                    self.send('reloadData',true);
                }
            })
            //  this.set('controllers.application.user' , this.get('session.user'));
            //           self.set('controllers.application.content', self.get('session.user'));
            /*           if (this.get('session.user.answerId')) {

                           self.store.find('answer').then(function (answer) {
                               self.send('clearVariables');
                               
                           })
                       } else {
                           self.send('clearVariables');
                       }*/
        },
        clearVariables: function () {

            this.set("username", "");
            this.set("password", "");
            this.set("email", "");
            this.transitionToRoute('test');
        }
    }
});
