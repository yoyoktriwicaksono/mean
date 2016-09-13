var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
	var user = new User(req.body);
	console.log('param :' + req.body);	
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.listPage = function(req, res, next) {
	User.find({},'username email firstName lastName',{
			skip : 10,
			limit : 10
		}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.listUsernameEmail = function(req, res, next) {
	User.find({},'username email', function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};