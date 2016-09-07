var connect = require('connect');
var app = connect();

var helloWorld = function (req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.write('Hello World')
	res.end();
};
app.use(helloWorld);

app.listen(3000);

console.log('Server running at http://localhost:3000/');
