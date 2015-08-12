import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-checkbox',
    attributeBindings: ['checked', 'question', 'name', 'label', 'skill', 'user', 'bubbles'],
    didInsertElement: function(argument) {

        var element = this.$()[0];
        var _this = this;
        element.addEventListener('change', function(e) {
            _this.toggleProperty('checked');
            e.stopPropogation;
            return false;
        });
    }
});
