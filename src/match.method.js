'use strict';

async function profileMatch(username, username2, scrapper) {
	const [profile, profileTwo] = await Promise.all([
		scrapper(username),
		scrapper(username2),
	]);

	if (typeof profile !== 'number' && typeof profileTwo !== 'number') {
		const skills = profile.careers.concat(profile.courses, profile.oldCourses);
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
		return results;
	}
	return false;
}

module.exports = profileMatch;
