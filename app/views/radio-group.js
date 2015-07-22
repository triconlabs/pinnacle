import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'paper-radio-group',
    attributeBindings: ['toggles', 'selected', 'user'],
    didInsertElement: function(argument) {
        console.log($(this)[0]);
        var element = this.$()[0];
        var _this = this;
        element.addEventListener('core-activate', function(e) {
            console.log(e);
            console.log(e.detail.item.label);
            console.log('paper-radio-group');
            _this.set('user.gender', e.detail.item.label);
            _this.get('user').save().then(function() {

                $('#toast').attr('text', 'updated');
                Ember.$('#toast')[0].show();
            });


        });
    }
});
