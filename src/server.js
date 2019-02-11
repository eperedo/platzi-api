'use strict';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const Hapi = require('hapi');
const scrapper = require('./scrapper');

const server = new Hapi.Server({
	host: '0.0.0.0',
	port: process.env.PORT || 4000,
	routes: {
		cors: {
			origin: ['*'],
		},
	},
});

server.method('scrapper', scrapper, {
	cache: {
		expiresIn: 300 * 1000,
		generateTimeout: 30000,
	},
});

server.route({
	async handler(request, h) {
		const { username } = request.params;
		try {
			if (username) {
				const result = await server.methods.scrapper(username);
				if (typeof result === 'number') {
					if (result === 1) {
						return h.response().code(403);
					} else if (result === 2) {
						return h.response().code(404);
					}
				}
				return h.response(result);
			}
			return h.response().code(400);
		} catch (error) {
			console.log('Err', error);
			return error;
		}
	},
	method: 'GET',
	path: '/profile/{username}',
});

process.on('uncaughtException', () => process.exit(1));

module.exports = server;
