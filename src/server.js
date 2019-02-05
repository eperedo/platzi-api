'use strict';

const Hapi = require('hapi');
const scrapper = require('./scrapper');

const server = new Hapi.Server({
	host: '0.0.0.0',
	port: process.env.PORT || 4000,
});

server.route({
	async handler(request, h) {
		const { username } = request.params;
		if (username) {
			const result = await scrapper(username);
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
	},
	method: 'GET',
	path: '/profile/{username}',
});

module.exports = server;
