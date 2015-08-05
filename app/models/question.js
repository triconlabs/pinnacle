import DS from 'ember-data';

export default DS.Model.extend({
    question: DS.attr('string'),
    number: DS.attr('number'),
    owner: DS.attr(),
    updatedAt: DS.attr('date'),
    createdAt: DS.attr('date'),
    show: DS.attr('boolean'),
    user: DS.belongsTo('user', {
        async: true
    })


});
