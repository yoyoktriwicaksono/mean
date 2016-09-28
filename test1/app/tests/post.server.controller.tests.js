var app = require('../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Post');

var user, post;

/*
	For Shouldjs, please refer to https://github.com/tj/should.js/
*/

describe('Post Controller Unit Tests:', function() {
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
			//console.log(user);
			post = new Post({
				title: 'Title Post',
				content: 'Content Post',
				author: user
			});

			post.save(function(err){
				done();
			});
		});
	});

	describe('Testing the GET methods', function() {
		it('Should be able to get the list of post', function(done){
			request(app).get('/posts/')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					//console.log(res);
					res.body.should.have.a.lengthOf(1);
					res.body.should.have.length(1);
					res.body.should.be.an.instanceOf(Array).and.have.lengthOf(1);
					res.body[0].should.have.property('title', post.title);
					res.body[0].should.have.property('content', post.content);
					done();
				});
		});

		it('Should be able to get the specific Post', function(done) {
			request(app).get('/posts/' + post.id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function(err, res) {
					res.body.should.be.an.instanceOf(Object).and.have.property('title',post.title);
					res.body.should.have.property('content', post.content);
					done();
				});
		});
	});

	afterEach(function(done) {
		Post.remove().exec();
		User.remove().exec();
		done();
	});

});