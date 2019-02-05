'use strict';

const server = require('./server');

(async () => {
	await server.start();
	console.log(`Server started at ${server.info.uri}`);
})();
