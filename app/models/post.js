import DS from 'ember-data';
export default DS.Model.extend({
    tags: DS.attr(),
    createdAt: DS.attr('date'),
    post: DS.attr('string'),
    link: DS.attr('string'),
    user: DS.belongsTo('user', {
        async: true
    })
});
