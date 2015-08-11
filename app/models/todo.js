import DS from 'ember-data';

export default DS.Model.extend({
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
	owner: DS.attr(),
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean'),
    tags : DS.attr(),
    user : DS.belongsTo('user' , {async : true})
});


