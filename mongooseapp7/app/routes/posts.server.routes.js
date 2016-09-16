var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {
	app.route('/posts')
		.post(posts.create)
		.get(posts.list);

	app.route('/promise/posts')
		.post(posts.createWithPromise)
		.get(posts.listWithPromise);

	app.route('/posts/:postId')
		.get(posts.read);

	app.param('postId', posts.postByID);
};