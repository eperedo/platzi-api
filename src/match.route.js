'use strict';

const Joi = require('Joi');

const route = {
	async handler(request, h) {
		const { username, username2 } = request.params;
		const [profile, profileTwo] = await Promise.all([
			request.server.methods.scrapper(username),
			request.server.methods.scrapper(username2),
		]);

		if (typeof profile !== 'number' && typeof profileTwo !== 'number') {
			const skills = profile.careers.concat(
				profile.courses,
				profile.oldCourses,
			);
			const skillsTwo = profileTwo.careers.concat(
				profileTwo.courses,
				profileTwo.oldCourses,
			);
			const results = skills.reduce(
				(acum, skill) => {
					const currentSkill = skillsTwo.find(c => c.title === skill.title);
					if (currentSkill) {
						acum.totalMatches += 1;
					}
					return acum;
				},
				{ totalMatches: 0, username, username2 },
			);

			results.totalCareers =
				skills.length + skillsTwo.length - results.totalMatches;
			results.match = results.totalMatches / results.totalCareers;
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
