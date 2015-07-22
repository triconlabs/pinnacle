import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'paper-input-decorator',
    attributeBindings: ['value', 'type', 'label', 'floatingLabel', 'bubbles', 'id', 'pattern' , 'style'],
    classNames: ['register']
});
