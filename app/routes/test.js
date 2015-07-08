import Ember from 'ember';
import authRoute from '../routes/auth';

export default authRoute.extend({
    modelType: 'question',
    model: function() {
        console.log("momomomomo");
        var cached;
        cached = this.loadModelFromCache();
        console.log(cached.get('length'));
        if (cached.get('length')) {
            //  this.needsUpdate = true;
            return cached;
        } else {
            return this.loadModel();
        }
    },
    loadModel: function() {
        console.log('loadModel')
        var _this = this;
        return this.store.findAll(this.get('modelType')).then(function() {
            return _this.loadModelFromCache();
        });
    },
    loadModelFromCache: function() {
        console.log('loadModelFromCache')
        return this.store.all(this.get('modelType'));
    },
});
