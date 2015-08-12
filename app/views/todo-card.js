import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'paper-shadow',
    attributeBindings: ['checked'],
    classNameBindings: ['isDone:done:question'],
    isDone: Ember.computed.alias('checked'),
    attributeBindings: ['z'],
    isEditing: false,
    didInsertElement: function() {
        var element = this.$()[0];
        element.setZ(3);
        // Hide Everything
        //    this.$().hide();
        this.$().animate({
            left: '0px'
        }, 0);
        this._super();
    },
    willDestroyElement: function() {
        this.$().animate({
            left: '-300px'
        }, 0);
        this._super();
    },
    click: function(evt) {},
    focusOut: function() {
        this.$().animate({
            height: '77px'
        }, 10);

        this.set('isEditing', false);
    },
    mouseEnter: function() {

        this.$().animate({
            height: '200px'
        }, 10);




    },
    mouseLeave: function() {
        this.$().animate({
            height: '77px'
        }, 10);

    },
    focusIn: function() {
        this.$().animate({
            height: '200px'
        }, 10);



    }
});
