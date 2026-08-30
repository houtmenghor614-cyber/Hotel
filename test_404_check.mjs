import puppeteer from 'puppeteer-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const failed = [];
page.on('response', (res) => {
  if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
});
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
await page.goto('http://127.0.0.1:5173/hotels', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));
console.log('--- failed requests ---');
failed.forEach((f) => console.log('  •', f));
await browser.close();
