import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        toggleDrawer: function () {
            $('core-drawer-panel')[0].togglePanel();
        },
        goBack: function () {
            this.transitionToRoute('test');
        },
        gotoUser : function(user){
        	this.transitionToRoute('user' , user);
        }
    }
});
