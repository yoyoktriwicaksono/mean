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

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	console.log('req:' + JSON.stringify(req.headers));
	console.log('id:' + id);
	User.findOne({
			_id: id
		}, function(err, user) {
			console.log('user :' + user);
			if (err) {
				return next(err);
			} else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			var result = {
				Code : 200,
				Id : user.id,
				Message : 'Update Berhasil'
			};

			res.json(result);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			var result = {
				Code : 200,
				Id : req.user.id,
				Message : 'Delete Berhasil'
			};

			res.json(result);			
		}
	})
};