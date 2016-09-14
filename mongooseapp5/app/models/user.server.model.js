var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type : String,
		index : true
	},
	username: {
		type : String,
		// predefined modifier
		trim : true,
		// set as unique index
		unique : true
	},
	password: String,
	created: {
		type : Date,
		// default value
		default : Date.now
	},
	website: {
		type : String,
		// set custom modifier
		set : function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				}
				return url;
			}
		},
		// get custom modifier
		get : function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				}
				return url;
			}
		}
	}
});

// Virtual attributes
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';	
});

// Set to use get custom modifier
UserSchema.set('toJSON',{getters: true, virtuals: true});

mongoose.model('User', UserSchema);