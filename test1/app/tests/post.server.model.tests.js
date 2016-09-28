var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Post');

var user, post;

/*
	For Shouldjs, please refer to https://github.com/tj/should.js/
*/

describe('Post Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Test firstname',
			lastName: 'Test Lastname',
			email: 'test@test.com',
			username: 'usernametest',
			password: 'passwordtest',
			role: 'Admin'
		});

		user.save(function() {
			post = new Post({
				title: 'Title Post',
				content: 'Content Post',
				author: user
			});

			done();
		});
	});

	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			post.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save an post without a title', function() {
			post.title = '';
			post.save(function(err) {
				should.exist(err);
			});
		});
	});

	afterEach(function(done) {
		Post.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});

});