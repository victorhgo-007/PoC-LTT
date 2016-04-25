//var Controller = require('./controller');

module.exports = function(app) {

	console.log('Cargando Controller...');

	// Application
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // Carga unica de la vista
	});
};
