import Ember from "ember";
export default Ember.TextField.extend({
	tagName : 'input',
    type: 'file',
    attributeBindings: ['name', 'mulitple', 'id'],
    change: function(evt) {
        console.log(evt);
     
    }
});
