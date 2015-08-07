import DS from 'ember-data';

export default DS.Model.extend({
	createdAt : DS.attr('date'),
	updatedAt : DS.attr('date'),
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
});


