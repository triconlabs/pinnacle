import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'paper-input-decorator',
    attributeBindings: ['value', 'type' , 'label', 'floatingLabel', 'bubbles', 'id','pattern'],
    classNames: []
});
