// Configuration for development environment

module.exports = {
	// Development configuration options
	db: 'mongodb://localhost/mean',
	sessionSecret: 'developmentSessionSecret',
	// Change this as yours. This is for testing purpose !!!
	google: {
		clientID: '256816843091-chbk8tlu5n5bh4eejvtutitvner9st5b.apps.googleusercontent.com',
		clientSecret: 'SJ9vhR9M2Y6SEOolEPAhaQ-B',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};