import DS from 'ember-data';

export default DS.Model.extend({
	response : DS.attr(),
	owner : DS.attr(),
	createdAt : DS.attr('date'),
	user: DS.belongsTo('user'),
	updatedAt : DS.attr('date'),
	createdAt : DS.attr('date')
  
});
