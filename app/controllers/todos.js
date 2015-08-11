import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['todos'],
    todoInputText: '',
    parsetodoInputText: function() {
        var string = this.get('todoInputText');

        if (string[string.length - 1] == '#') {
            alert("hash begin");
        }
    }.property('todoInputText'),
    allTodos: Ember.computed.alias('controllers.todos'),
    itemController: 'todo',
    canToggle: function() {
        var anyTodos = this.get('allTodos.length');
        var isEditing = this.isAny('isEditing');

        return anyTodos && !isEditing;
    }.property('allTodos.length', '@each.isEditing'),
    actions: {
        gotoExpertise: function(param) {
            var _this = this;
            console.log("Going to expertise" + param);

            this.store.find('expertise', {
                "where": {
                    "skill": param
                }
            }).then(function(model) {
                console.log(model.get('content')[0])

                _this.transitionToRoute('expertise', model.get('content')[0]);
            })
        },
        createTodo: function() {
            var title, todo, postText, a;
            var hashtags = [];

            // Get the todo title set by the "New Todo" text field
            postText = this.get('todoInputText').trim();
            a = postText.split(' ');
            var regexp = new RegExp('#([^\\s]*)', 'g');
            title = postText.replace(regexp, '');
            if (!title) {
                return;
            }

            // Create the new Todo model
            todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false,
                tags: []

            });
            todo.ParseACL = {
                owner: this.get('session.userId'),

            };
            console.log(title);
            console.log(postText);

            for (var i = 0; i < a.length; i++) {
                console.log(a[i][0]);
                if (a[i][0] == '#') {

                    hashtags.push(a[i].substr(1))
                }
            }
            console.log(hashtags);
            todo.set('tags', hashtags);
            todo.set('user', this.get('session.user'));
            todo.save();

            // Clear the "New Todo" text field
            this.set('todoInputText', '');
        },

        clearCompleted: function() {
            var completed = this.get('completed');
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },

    /* properties */

    remaining: Ember.computed.filterBy('model', 'isCompleted', false),
    completed: Ember.computed.filterBy('model', 'isCompleted', true),

    allAreDone: function(key, value) {
        if (value !== undefined) {
            this.setEach('isCompleted', value);
            return value;
        } else {
            var length = this.get('length');
            var completedLength = this.get('completed.length');

            return length > 0 && length === completedLength;
        }
    }.property('length', 'completed.length')
});
