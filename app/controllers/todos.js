import Ember from 'ember';
export default Ember.ArrayController.extend({
    needs: ['todos'],
    sortProperties: ['createdAt'],
    todoInputText: '',
    sortProperties: ['createdAt:desc'],
    sortedModel: Ember.computed.sort("model", "sortProperties"),
    highLightedText: function() {
        var string = this.get('todoInputText');
        var regexp = new RegExp('#([^\\s]*)', 'g');
        var title = string.replace(regexp, '<span class="highLighter">$&</span>');
        return title;
    }.property('todoInputText'),
    itemController: 'todo',
    canToggle: function() {
        var anyTodos = this.get('allTodos.length');
        var isEditing = this.isAny('isEditing');
        return anyTodos && !isEditing;
    }.property('allTodos.length', '@each.isEditing'),
    actions: {
        gotoExpertise: function(param) {
            var _this = this;
            this.store.find('expertise', {
                "where": {
                    "skill": param
                }
            }).then(function(model) {
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
            for (var i = 0; i < a.length; i++) {
                if (a[i][0] == '#') {
                    hashtags.push(a[i].substr(1))
                }
            }
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
    allTodos: Ember.computed.alias('controllers.todos'),
    remaining: Ember.computed.filterBy('model', 'isCompleted', false),
    completed: Ember.computed.filterBy('model', 'isCompleted', true),
    progress: function() {
        var remaining = this.get("model").filterBy("isCompleted", false).get("length");
        var completed = this.get("model").filterBy("isCompleted", true).get("length");
        return 100 * completed / (remaining + completed)
    }.property('completed.length', 'length'),
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
