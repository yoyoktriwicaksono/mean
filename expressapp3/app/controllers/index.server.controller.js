exports.render = function(req, res) {
	res.render('index', {
		title: 'Hello World',
		myHello: 'Hello World from Express'
	});
};