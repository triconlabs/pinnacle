import ParseUser from 'ember-parse/models/parse-user';
import DS from 'ember-data';

var attr = DS.attr;

export default ParseUser.extend({
    submitted: DS.attr(),
    role: DS.attr('string'),
    answer: DS.belongsTo('answer', {async: true}),
    gender : DS.attr('string'),
    objectId : DS.attr('string'),
    skills : DS.attr()

    /**
     * This model already has this attributes.
     *
     * username: attr('string'),
     * password: attr('password'),
     * email: attr('string'),
     * emailVerified: attr('boolean'),
     * sessionToken: attr('string'),
     * createdAt: attr('date'),
     * updatedAt: attr('date'),
     *
     *
     * Add custom attributes below.
     * For example:
     *
     * firstName: attr('string'),
     * lastName: attr('string')
     */
});
