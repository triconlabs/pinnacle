import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
    model: function (argument) {

        return this.store.findAll('user');
    },
    setupController: function (controller, model) {
        console.log("model");
        console.log(model.get('content'));
        controller.set('model', model);
    }
});
