import Ember from 'ember';

export default Ember.Controller.extend({

    needs: ["login", "test"],
    content: null,
    user: null,
    admin: function() {
        if (this.get('user.role') == 'admin') {
            return true;
        } else {
            return false;
        }

    }.property('user.role'),
    inLogin: function() {
        if (this.get('currentPath') == 'login') {
            return false;
        } else {
            return true;
        }

    }.property('currentPath'),
    init: function() {
        //this.send('reloadData',false);
        this.set('user', this.get('session.user'));

    },
    actions: {
        upload: function() {
            console.log("clicking upload");
            Ember.$('#upload').click();
        },
        logout: function() {
            var self = this;
            console.log(this.get('model'));
            console.log("logging out");
            this.get('session').invalidate().then(function() {
                self.store.unloadAll('question');
                self.store.unloadAll('answer');
                self.store.unloadAll('user');
                self.set('content', null);
                $('core-drawer-panel')[0].togglePanel();
                self.transitionToRoute('login');
            })

        },
        users: function() {
            //  this.set('session.user.image' , $('#upload')[0].files[0]);
            $('core-drawer-panel')[0].togglePanel();
            this.transitionToRoute('users');
        },
        test: function() {
            $('core-drawer-panel')[0].togglePanel();
            this.transitionToRoute('test');
        },
        profile: function() {
            $('core-drawer-panel')[0].togglePanel();
            this.transitionToRoute('profile');
        },
        question: function() {
            $('core-drawer-panel')[0].togglePanel();
            this.transitionToRoute('question');
        },

    }
});
