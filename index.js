const puppeteer = require('puppeteer');

const URL = 'https://kodaktor.ru/g/exp260425';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(URL);
  const startTime = await page.evaluate(() => performance.now());
  await page.click('button');
  await page.waitForFunction(() => !document.querySelector('deepl-input-controller[translate="no"]'));
  const endTime = await page.evaluate(() => performance.now());
  const executionTime = endTime - startTime;
  const title = await page.title();

  console.log('document.title:', title);
  console.log('Execution time (ms):', executionTime.toFixed(2));

  await browser.close();
})();
