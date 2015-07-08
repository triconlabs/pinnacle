import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'core-collapse',
    attributeBindings: ['duration'],
    classNames: ['core-collapse-custom'],
    didInsertElement: function (argument) {
        console.log($(this)[0]);
        var element = this.$()[0];
        element.toggle();
    }
});
