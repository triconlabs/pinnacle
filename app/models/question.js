import DS from 'ember-data';

export default DS.Model.extend({
	question : DS.attr('string'),
	number : DS.attr('number'),
	answer : DS.attr('string'),
	userAnswer : DS.attr('string'),
	show : DS.attr('boolean')

  
});
