import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-radio-button',
    attributeBindings: ['toggles', 'checked', 'question' , 'name'],
    didInsertElement: function(argument) {
        console.log($(this)[0]);
        var element = this.$()[0];
        var self = this;
        element.addEventListener('change', function() {
            console.log("something is happening")
            console.log("material ripple");
            if (self.get('question')) {

                console.log(self.get('question'));
                self.toggleProperty('question.show');
                self.get('question').save().then(function() {

                    $('#toast').attr('text', 'updated question');
                    Ember.$('#toast')[0].show()
                });

            } 
        });
    }
});
