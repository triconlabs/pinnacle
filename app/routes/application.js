import Ember from 'ember';

export default Ember.Route.extend({
    model() {
            return this.store.find('answer').then(function (model) {
                console.log(model);
                console.log(model.get('content'));
                var answer = Ember.ArrayProxy.create({
                    content: Ember.A(model.get('content'))
                });
                console.log(answer.get('content')[0]);
                return answer.get('content')[0];
                //return model
            });
        },

        actions: {
            reloadData(check) {
                console.log("reloading data");
                this.store.unloadAll('answer');
                this.store.unloadAll('question');
                if (!check) {

                    this.store.unloadAll('user');
                }
                this.refresh();
            }
        }
});
