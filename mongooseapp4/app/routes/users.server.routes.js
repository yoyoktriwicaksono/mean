var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
	app.route('/users')
		.post(users.create)
		.get(users.list);
	app.route('/usernameemail')
		.get(users.listUsernameEmail);
	app.route('/usersPage')
		.get(users.listPage);
	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.param('userId', users.userByID);
};