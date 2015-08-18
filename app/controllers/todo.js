import Ember from 'ember';

export default Ember.ObjectController.extend({
    isEditing: false,

    // We use the bufferedTitle to store the original value of
    // the model's title so that we can roll it back later in the
    // `cancelEditing` action.
    bufferedTitle: Ember.computed.oneWay('title'),

    actions: {
        editTodo: function() {
            this.set('isEditing', true);
            
        },

        doneEditing: function() {
             var todo = this.get('model');
            var bufferedTitle = this.get('bufferedTitle').trim();
            var hashtags = [];
            var a = bufferedTitle.split(' ');
            var regexp = new RegExp('#([^\\s]*)', 'g');
            var title = bufferedTitle.replace(regexp, '');
            if (!title) {
                return;
            }


            
            console.log(title);
            console.log(bufferedTitle);

            for (var i = 0; i < a.length; i++) {
                console.log(a[i][0]);
                if (a[i][0] == '#') {

                    hashtags.push(a[i].substr(1))
                }
            }
            console.log(hashtags);
            todo.set('tags', hashtags);
            
            
            if (Ember.isEmpty(bufferedTitle)) {
                // The `doneEditing` action gets sent twice when the user hits
                // enter (once via 'insert-newline' and once via 'focus-out').
                //
                // We debounce our call to 'removeTodo' so that it only gets
                // made once.
                Ember.run.debounce(this, 'removeTodo', 0);
            } else {
                todo.set('title', title);
                todo.save();
            }

            // Re-set our newly edited title to persist its trimmed version
            this.set('bufferedTitle', bufferedTitle);
            this.set('isEditing', false);
        },

        cancelEditing: function() {
            this.set('bufferedTitle', this.get('title'));
            this.set('isEditing', false);
        },

        removeTodo: function() {
            this.removeTodo();
        }
    },

    removeTodo: function() {
        var todo = this.get('model');

        todo.deleteRecord();
        todo.save();
    },

    saveWhenCompleted: function() {
        this.get('model').save();
    }.observes('isCompleted')
});
