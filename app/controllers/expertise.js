import Ember from 'ember';
export default Ember.Controller.extend({
    postInputText: "",
    actions: {
        createPost: function(argument) {
            var title, post, postText, a, _this = this;
            var hashtags = [];
            // Get the post title set by the "New Post" text field
            postText = this.get('postInputText');
            a = postText.split(' ');
            var regexp = new RegExp('#([^\\s]*)', 'g');
            title = postText.replace(regexp, '');
            if (!title) {
                return;
            }
            // Create the new Post model
            post = this.store.createRecord('post', {
                post: title,
                tags: []
                
            });
            post.ParseACL = {};
            for (var i = 0; i < a.length; i++) {
                if (a[i][0] == '#') {
                    hashtags.push(a[i].substr(1))
                }
            }
            console.log(_this.get('session.user'));
            post.set('tags', hashtags);
            post.set('user', _this.get('session.user'));
            post.save();
            // Clear the "New post" text field
            this.set('postInputText', '');
        }
    }
});
