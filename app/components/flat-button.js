import Ember from 'ember';

export default Ember.Component.extend({
	tagName : 'paper-button',
    attributeBindings: ['bubbles' , 'collapse'],
	    didInsertElement: function(argument) {
        console.log("NIKOLA");
        console.log($(this)[0]);
        var self = this;
        var element = this.$()[0];
        element.addEventListener('core-transitionend', function() {
            console.log("something is happening")
            console.log("TESLAAAA");

            
            self.sendAction();

        });

    }
});
