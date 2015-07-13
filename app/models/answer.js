import DS from 'ember-data';

export default DS.Model.extend({
	response : DS.attr(),
	owner : DS.attr(),
	user: DS.belongsTo('user' , {async : true}),
	updatedAt : DS.attr('date'),
	createdAt : DS.attr('date')
  
});
