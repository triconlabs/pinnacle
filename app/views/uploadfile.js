import Ember from "ember";
export default Ember.TextField.extend({
    type: 'file',
    init: function() {
        var _this = this;
        $('#upload').change(function(e) {
            _this.setProfilePicture();
        });
        this._super();
        
    },
    attributeBindings: ['name', 'mulitple', 'id'],
    hookup: function() {
        var _this = this;
        this.on('change', _this, _this.setProfilePicture);
    }.on('init'),
    change: function(evt) {
        alert("asdf");
        setProfilePicture();
    },
    setProfilePicture: function(e) {
        var _this = this;
        var file = $('#upload')[0].files[0];
        var serverUrl = 'https://api.parse.com/1/files/' + file.name;
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", 'IrcvQfurruulfg3GMOFV9f2pESsBwcJ18wTlc850');
                request.setRequestHeader("X-Parse-REST-API-Key", '7erEDPfMmoxik96OICRjSzBBxkWoYYt1drZ1ZYo8');
                request.setRequestHeader("Content-Type", file.type);
            },
            url: serverUrl,
            data: file,
            processData: false,
            contentType: false,
            success: function(data) {
                _this.set('session.user.image', data.url);
                _this.get('session.user').save().then(function(model) {
                    var key = _this.get('session.sessionStoreKey'),
                        user = _this.get('controllers.application.user');
                    $('#toast').attr('text', 'profile picture saved');
                    Ember.$('#toast')[0].show();
                    var args = JSON.parse(localStorage[key]);
                    args._response.image = user.get('image');
                    localStorage.setItem(key, JSON.stringify(args));
                })
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
    }
});
