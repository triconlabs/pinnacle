import Ember from 'ember';
export default Ember.Controller.extend({
    needs: ['answer', 'application'],
    email: "",
    password: "",
    username: "",
    loginBool: true,
    formFilledBool: false,
    showFab: function() {
        console.log("fabbing");
        if (this.get('loginBool')) {
            if (this.get('username') && this.get('password')) {
                $('paper-fab').css('transform', 'rotate(0deg)');
                $('paper-fab').css('background-color', '#00C853');
                $('paper-fab').attr('icon', 'check');
                this.set('formFilledBool', true);
            } else {
                $('paper-fab').css('background-color', '#ED2553');
                $('paper-fab').attr('icon', 'add');
                this.set('formFilledBool', false);
            }
        } else {
            this.toggleProperty('formFilledBool');
            if (this.get('username') && this.get('password') && this.get('email')) {
                $('paper-fab').css('transform', 'rotate(0deg)');
                $('paper-fab').css('background-color', '#00C853');
                $('paper-fab').attr('icon', 'check');
                this.set('formFilledBool', true);
            } else {
                $('paper-fab').css('background-color', '#ED2553');
                $('paper-fab').attr('icon', 'add');
                $('paper-fab').css('transform', 'rotate(135deg)');
                this.set('formFilledBool', false);
            }
        }
    }.observes('username', 'password', 'email', 'loginBool'),
    actions: {
        fab: function() {
            if (this.get('formFilledBool')) {
                if (this.get('loginBool')) {
                    this.send('login', true);
                } else {
                    this.send('signup');
                }
            } else {
                if (this.get('loginBool')) {
                    $('.login-name span').text('REGISTER');
                    $('paper-fab').css('transform', 'rotate(135deg)');
                } else {
                    $('.login-name span').text('LOGIN');
                    $('paper-fab').css('transform', 'rotate(0deg)');
                }
                this.toggleProperty('loginBool');
                $(".register").toggle('fast');
            }
        },
        signup: function() {
            var input = $('#email')[0];
            $('paper-input-decorator').attr('error', 'required information');
            if (!this.get('username')) {
                $('paper-input-decorator')[0].isInvalid = true;
            } else if (!this.get('password')) {
                $('paper-input-decorator')[1].isInvalid = true
            } else if (!this.get('email')) {
                $('paper-input-decorator')[2].isInvalid = true
            } else if (!input.validity.valid) {
                $('paper-input-decorator').attr('error', 'signup with your tricon infotech mail-id');
                $('paper-input-decorator')[2].isInvalid = true
            } else {
                var self = this;
                this.get('session').signup({
                    username: this.get('username'),
                    password: this.get('password'),
                    email: this.get('email')
                }).then(function(user) {
                    console.log(user);
                    self.send('login', true);
                }).catch(function(reason) {
                    var err = `Code ${reason.errors[0].code}: ${reason.errors[0].details}`;
                    console.error(err);
                    this.set('authError', err);
                });
            }
        },
        showMe: function() {
            $('core-collapse').toggle()
        },
        login: function(setPermissions) {
            var _this = this;
            this.get('session').authenticate(this.get('username'), this.get('password')).then(function(user) {
                console.log("LOGGIN IN");
                if (setPermissions) {
                    console.log('setting user permission');
                    user.ParseACL = {
                        role: 'Moderators',
                        owner: user.id
                    };
                    user.save().then(function() {
                        _this.send('getAnswers');
                    })
                }
            }).catch(function(error) {
                console.log("not logged in");
                console.log(error);
                if (error.responseJSON.code == 101) {
                    $('paper-input-decorator').attr('error', 'incorrect credentials');
                    $('paper-input-decorator')[1].isInvalid = true
                } else if (error.responseJSON.code == 202) {
                    $('paper-input-decorator').attr('error', 'This username is already taken');
                    $('paper-input-decorator')[1].isInvalid = true
                } else if (error.responseJSON.code == 203) {
                    $('paper-input-decorator').attr('error', 'This email-id is already registered');
                    $('paper-input-decorator')[1].isInvalid = true
                }
            })
        },
        getAnswers: function() {
            var _this = this;
            this.store.all('user').filter(function(model) {
                if (model.get('id') == _this.get('session.userId')) {
                    _this.set('controllers.application.user', model);
                   //_this.set("username", "");
                    //_this.set("password", "");
                    //_this.set("email", "");
                    _this.send('reloadData', true);
                }
            })
        },
        clearVariables: function() {
            this.set("username", "");
            this.set("password", "");
            this.set("email", "");
            this.transitionToRoute('test');
            return 0;
        }
    }
});
