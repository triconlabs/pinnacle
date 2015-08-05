import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-radio-button',
    attributeBindings: ['toggles', 'checked', 'question', 'name', 'label', 'skill', 'user'],
    didInsertElement: function(argument) {
        console.log($(this)[0]);
        var element = this.$()[0];
        var _this = this;
        element.addEventListener('change', function() {
            console.log("something is happening")
            console.log("material ripple");
            if (_this.get('question')) {

                console.log(_this.get('question'));
                _this.toggleProperty('question.show');
                _this.get('question').save().then(function() {

                    $('#toast').attr('text', 'updated question');
                    Ember.$('#toast')[0].show()
                });

            } else if (_this.get('skill')) {
                (_this.get('user.expertise'))[_this.get('skill')] = !((_this.get('user.expertise'))[_this.get('skill')]);
                
                console.log((_this.get('user.expertise'))[_this.get('skill')]);
                

                     _this.get('user').save().then(function() {

                         $('#toast').attr('text', 'user info updated');
                         Ember.$('#toast')[0].show();
                         var key = _this.get('session.sessionStoreKey'),
                             user = _this.get('user');
                        
                         var args = JSON.parse(localStorage['ember-parse:session']);
                         args._response.expertise[_this.get('skill')] = !args._response.expertise[_this.get('skill')];
                         localStorage.setItem('ember-parse:session', JSON.stringify(args));
                     });
            }
        });
    }
});
