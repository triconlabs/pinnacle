import Ember from 'ember';

export function pluralize(singular, count) {
    /* From Ember-Data */
    var inflector = Ember.Inflector.inflector;

    return count === 1 ? singular : inflector.pluralize(singular);
}

export default Ember.Helper.helper(pluralize);
