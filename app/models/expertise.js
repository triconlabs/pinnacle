import DS from 'ember-data';

export default DS.Model.extend({
    skill: DS.attr('string'),
    user: DS.belongsTo('user', {
        async: true
    })
});
