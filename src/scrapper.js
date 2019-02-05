'use strict';

const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const urlBase = 'https://platzi.com';

async function getProfileInfo(username) {
	const browser = await puppeteer.launch({
		args: chrome.args,
		// ugly hack since chrome-aws-lambda cannot be loaded from local
		executablePath: process.env.CHROME_PATH || (await chrome.executablePath),
		headless: chrome.headless,
	});
	const page = await browser.newPage();
	await page.goto(`${urlBase}/@${username}`);
	const profile = await page.evaluate(() => {
		const isPrivate = document.querySelector('.PrivateProfile');
		const isError = document.querySelector('.Errorpage');
		if (isPrivate) {
			return 1;
		} else if (isError) {
			return 2;
		} else {
			const facebookDom = document.querySelector('.icon-fcbk');
			const twitterDom = document.querySelector('.icon-twt');
			const flagDom = document.querySelector('.ProfileHeader-flag');
			const websiteDom = document.querySelector('.UserUrl-link');
			const bioDom = document.querySelector('.Biography-text');
			const nameDom = document.querySelector('.ProfileHeader-name');
			const careersDom = document.querySelectorAll('.Career-flex');
			const coursesDom = document.querySelectorAll('.Course.is-principal');
			const pointsDom = document.querySelectorAll('.ProfileScore-number');
			const oldCoursesDom = document.querySelectorAll('.Course.is-deprecated');
			const profileInfo = {
				bioDom: bioDom ? bioDom.textContent : '',
				careers: [],
				country: flagDom ? flagDom.alt : '',
				courses: [],
				facebook: facebookDom ? facebookDom.href : '',
				flagUrl: flagDom ? flagDom.src : '',
				name: nameDom ? nameDom.textContent : '',
				oldCourses: [],
				totalPoints: pointsDom[0] ? Number(pointsDom[0].textContent) : 0,
				totalQuestions: pointsDom[1] ? Number(pointsDom[1].textContent) : 0,
				totalAnswers: pointsDom[2] ? Number(pointsDom[2].textContent) : 0,
				twitter: twitterDom ? twitterDom.href : '',
				website: websiteDom ? websiteDom.href : '',
			};
			careersDom.forEach(career => {
				const badge = career.querySelector('img').src;
				const title = career.querySelector('.Career-title').textContent;
				profileInfo.careers.push({ badge, title });
			});
			coursesDom.forEach(course => {
				const badge = course.querySelector('img').src;
				const title = course.querySelector('.Course-title').textContent;
				const career = course.querySelector('.Course-career').textContent;
				profileInfo.courses.push({ badge, title, career });
			});
			oldCoursesDom.forEach(course => {
				const badge = course.querySelector('img').src;
				const title = course.querySelector('.Course-title.is-deprecated')
					.textContent;
				profileInfo.oldCourses.push({ badge, title });
			});
			return profileInfo;
		}
	});
	await browser.close();
	return profile;
}

module.exports = getProfileInfo;
