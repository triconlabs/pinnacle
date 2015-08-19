import Ember from "ember";

export default Ember.TextField.extend({
    type: 'file',
			init: function() {
				this._super();
				//this.set("controller", App.DeviceController);
			},
		    attributeBindings: ['name','mulitple'],
		    foo:['a','b'],
		    change: function(evt) {
				
				Ember.Logger.log(evt);
				var self = this;
				var input = evt.target;
				Ember.Logger.log('\n');
				Ember.Logger.log("uploadview input files")
				Ember.Logger.log(input.files.length);
				
				if (input.files && input.files[0] && input.files.length < 5) {
					


				    // Loop through the FileList and render image files as thumbnails.
					self.sendAction('myupload',input.files);
				    for (var i = 0, f; f = input.files[i]; i++) {

						// Only process image files.
						// if (!f.type.match('image.*')) {
						//  continue;
						// }

						var reader = new FileReader();

						// Closure to capture the file information.
						reader.onload = (function(theFile) {
							return function(e) {
								// Render thumbnail.
								Ember.Logger.log(theFile)
								Ember.Logger.log(e.target)

								
								/*Ember.Logger.log((self.get('controller')).sendAction("changeme"))
								    span.innerHTML = ['<p ',
								                      ' title="', escape(theFile.name), '">',theFile.name,'</p>'].join('');
								    document.getElementById('list').insertBefore(span, null);*/
							};
						})(f);

						// Read in the image file as a data URL.
						reader.readAsDataURL(f);
					}				
				}
		    }
});