'use strict';

const Joi = require('joi');

const route = {
	async handler(request, h) {
		const { username, username2 } = request.params;
		const results = await request.server.methods.profileMatch(
			username,
			username2,
			request.server.methods.scrapper,
		);
		if (results) {
			return h.response(results);
		}
		return h.response().code(400);
	},
	method: 'GET',
	options: {
		validate: {
			params: {
				username: Joi.string().required(),
				username2: Joi.string().required(),
			},
		},
	},
	path: '/profiles/{username}/{username2}/matches',
};

module.exports = route;
