var Post = require('mongoose').model('Post');
var User = require('mongoose').model('User');

exports.create = function(req, res, next) {
	console.log('create');
	console.log('body ' + JSON.stringify(req.body));
	console.log('author id ' + req.body.author);

	User.findOne({
			_id: req.body.author
		}, function(err, user) {
			if(err) {
      			console.log(err);
      			return
    		}
			console.log('user :' + user);

			var post = new Post();
			post.title = req.body.title;
			post.content = req.body.content;
			post.author = user;

			post.save(function(err) {
				if (err) {
					return next(err);
				} else {
					res.json(post);
				}
			});
		}
	);	
};

exports.createWithPromise = function(req, res, next) {
	console.log('create');
	console.log('body ' + JSON.stringify(req.body));
	console.log('author id ' + req.body.author);

	User.findOne({_id: req.body.author})
		.exec()
		.then(function(user) {
			console.log('user :' + user);

			var post = new Post();
			post.title = req.body.title;
			post.content = req.body.content;
			post.author = user;

			post.save()
				.then(function(post) {
					res.json(post);
				});
		});	
};

exports.list = function(req, res, next) {
	console.log('list');

	Post.find().populate('author').exec(function(err, posts){
		if (err) {
			return next(err);
		} else {
			res.json(posts);
		}
	});
};

exports.listWithPromise = function(req, res, next) {
	console.log('list');

	Post.find().populate('author').exec()
		.then(function(posts){
			res.json(posts);
		});
};

exports.read = function(req, res) {
	res.json(req.post);
};

exports.postByID = function(req, res, next, id) {
	console.log('req:' + JSON.stringify(req.headers));
	console.log('id:' + id);
	Post.findOne({_id: id})
		.populate('author')
		.exec(function(err, post) {
			console.log('post :' + post);
			console.log('author :' + JSON.stringify(post.author));
			if (err) {
				return next(err);
			} else {
				req.post = post;
				next();
			}
		});
};
