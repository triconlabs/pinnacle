import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-input',
    attributeBindings: ['value', 'type' , 'label', 'floatingLabel', 'bubbles', 'id'],
    classNames: []
});
