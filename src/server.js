'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
	host: '0.0.0.0',
	port: process.env.PORT || 4000,
});

server.route({
	async handler(request) {
		const { username } = request.params;
		return username;
	},
	method: 'GET',
	path: '/profile/{username}',
});

module.exports = server;
