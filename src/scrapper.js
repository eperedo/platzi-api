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
			const careersDom = document.querySelectorAll('.Career-flex');
			const profileInfo = {
				careers: [],
				courses: [],
			};
			careersDom.forEach(career => {
				const badge = career.querySelector('img').src;
				const title = career.querySelector('.Career-title').textContent;
				profileInfo.careers.push({ badge, title });
			});
			return profileInfo;
		}
	});
	await browser.close();
	return profile;
}

module.exports = getProfileInfo;
