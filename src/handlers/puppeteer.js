import log from '../utils/log'
import version from '../chrome/version'
import chrome from '../utils/chrome'
const puppeteer = require('puppeteer')

export default async function handler (event, context, callback) {
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const page = await browser.newPage();

  log('Getting page title')
  const title = await page.title();



  await browser.close();
  setTimeout(() => chrome.instance.kill(), 0);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(title),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
