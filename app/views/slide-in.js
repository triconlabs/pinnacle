import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'paper-shadow',
    classNames: ['question'],
    attributeBindings: ['z'],
    didInsertElement: function() {
        var element = this.$()[0];
        element.setZ(3);
        // Hide Everything
    //    this.$().hide();
        $(".question").slideDown(300);
        this._super();
    },
    willDestroyElement: function() {
        this.$().slideUp(300);
    }
});
