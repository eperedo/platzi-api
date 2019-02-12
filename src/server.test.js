'use strict';

const server = require('./server');

// same default value that puppeteer has.
jest.setTimeout(30000);

describe('Platzi API', () => {
	test('GET /profile/{username} must return the public profile information', async () => {
		const route = {
			method: 'GET',
			url: '/profile/eperedo',
		};

		const { result, statusCode } = await server.inject(route);

		expect.assertions(15);
		expect(statusCode).toBe(200);
		expect(result.avatar).toBeDefined();
		expect(result.bio).toBeDefined();
		expect(result.country).toBeDefined();
		expect(Array.isArray(result.careers)).toBe(true);
		expect(Array.isArray(result.courses)).toBe(true);
		expect(result.facebook).toBeDefined();
		expect(result.flagUrl).toBeDefined();
		expect(result.platziLive).toBeDefined();
		expect(Array.isArray(result.oldCourses)).toBe(true);
		expect(result.totalPoints).toBeGreaterThanOrEqual(0);
		expect(result.totalQuestions).toBeGreaterThanOrEqual(0);
		expect(result.totalAnswers).toBeGreaterThanOrEqual(0);
		expect(result.twitter).toBeDefined();
		expect(result.website).toBeDefined();
	});

	test('GET /profile/{username} must return 404 if the username does not exist', async () => {
		const route = {
			method: 'GET',
			// if someone ever create this username I swear...
			url: '/profile/eperedo_not_real_user',
		};

		const { statusCode } = await server.inject(route);

		expect.assertions(1);
		expect(statusCode).toBe(404);
	});

	test('GET /profile/{username} must return 403 if the username has a private profile', async () => {
		const route = {
			method: 'GET',
			// I am using this username since it was the first one who show in the forums page and happy coincidence she has a private profile
			url: '/profile/Acosticarito',
		};

		const { statusCode } = await server.inject(route);

		expect.assertions(1);
		expect(statusCode).toBe(403);
	});

	test('GET /profiles/{username}/{username2}/matches must return 200', async () => {
		const route = {
			method: 'GET',
			url: '/profiles/eperedo/alex_rope/matches',
		};

		const { statusCode, result } = await server.inject(route);

		console.log('Result', result);

		expect.assertions(1);
		expect(statusCode).toBe(200);
	});
});
