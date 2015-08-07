import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'paper-shadow',
    attributeBindings: ['checked'],
    classNameBindings: ['isDone:done:question'],
    isDone : Ember.computed.alias('checked'),
    attributeBindings: ['z'],
    didInsertElement: function() {
        var element = this.$()[0];
        element.setZ(3);
        // Hide Everything
        //    this.$().hide();
        this.$().animate({left :'0px'} ,0);
        this._super();
    },
    willDestroyElement: function() {
        this.$().animate({left :'-300px'} ,0);
        this._super();
    }
});
