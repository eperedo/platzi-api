'use strict';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const Hapi = require('hapi');
const scrapper = require('./scrapper');
const profileMatch = require('./match.method');
const matchRoute = require('./match.route');

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
		expiresIn: 10 * 1000,
		generateTimeout: 30000,
	},
});

server.method('profileMatch', profileMatch, {
	cache: {
		expiresIn: 10 * 1000,
		generateTimeout: 30000,
	},
	generateKey: (key, key2) => `${key}-${key2}`,
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
			return error;
		}
	},
	method: 'GET',
	path: '/profile/{username}',
});

server.route(matchRoute);

process.on('uncaughtException', () => process.exit(1));

module.exports = server;
