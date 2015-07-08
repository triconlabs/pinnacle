import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-icon-button',

    attributeBindings: ['icon', 'action'],
    didInsertElement: function (argument) {

        console.log($(this)[0]);
        var self = this;
        var element = this.$()[0];
        element.addEventListener('core-transitionend', function () {

            if (self.get('param')) {
                console.log("something is happening")

                self.sendAction('action', self.get('param'));
            } else {
                console.log("material ripple");
                self.sendAction('action');
            }

        });

    }
});
