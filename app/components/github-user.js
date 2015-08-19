import Ember from 'ember';
export default Ember.Component.extend({
    attributeBindings : ['githubName'],
    githubUser: null,
    setupFlags: function() {
        var _this = this;
        var serverUrl = 'https://api.github.com/users/'+this.get('githubName');
        $.ajax({
            type: "GET",
            url: serverUrl,
            processData: false,
            contentType: false,
            success: function(data) {
                _this.setProperties({ // more logic here
                    someFlag: data.login,
                    anotherFlag: data.location,
                    githubUser: data
                });
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    }.on("init")
});
