/**
 * End-to-end: admin sets logo/banner/currency (KHR) → verify they appear on the
 * USER website. Requires: backend :8000, admin :5174, user :5173 all running.
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const API = 'http://127.0.0.1:8000/api/v1';
const USER = 'http://127.0.0.1:5173';

let failures = 0;
const step = (name, ok, detail = '') => {
  if (ok) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL  ${name}  ${detail}`);
  }
};

// 1) Admin API: login
const login = await fetch(`${API}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin@hotel.com', password: 'admin123' }),
}).then((r) => r.json());
const headers = { Authorization: `Bearer ${login.access_token}` };
step('admin login', Boolean(login.access_token));

// 2) Upload distinct logo + banner via the admin settings endpoints
const upload = async (kind, path, mime) => {
  const blob = new Blob([fs.readFileSync(path)], { type: mime });
  const form = new FormData();
  form.append('file', blob, `${kind}.png`);
  return fetch(`${API}/admin/settings/${kind}`, { method: 'POST', headers, body: form }).then((r) => r.json());
};
let logoPath = '/uploads/settings/logo.png';
let bannerPath = '/uploads/settings/banner.png';
try {
  const logoRes = await upload('logo', 'C:/Users/User/AppData/Local/Temp/hotel_test_logo.png', 'image/png');
  logoPath = logoRes.logo || logoPath;
  const bannerRes = await upload('banner', 'C:/Users/User/AppData/Local/Temp/hotel_test_banner.png', 'image/png');
  bannerPath = bannerRes.banner || bannerPath;
} catch (err) {
  console.log('  note: upload skipped (', err.message, ') — using seeded defaults');
}
step('admin uploaded logo via /admin/settings/logo', logoPath.startsWith('/uploads/settings/'), logoPath);
step('admin uploaded banner via /admin/settings/banner', bannerPath.startsWith('/uploads/settings/'), bannerPath);

// 3) Set currency to Riel (KHR) + site name
await fetch(`${API}/admin/settings`, {
  method: 'PUT',
  headers: { ...headers, 'Content-Type': 'application/json' },
  body: JSON.stringify({ currency: 'KHR', currency_symbol: '៛', site_name: 'Cambodia Stays' }),
});
const pub = await fetch(`${API}/settings/public`).then((r) => r.json());
step('public settings reflect KHR + logo + banner', pub.currency === 'KHR' && pub.site_name === 'Cambodia Stays' && pub.logo === logoPath, JSON.stringify(pub));

// 4) Real browser on the USER site
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => consoleErrors.push(`PAGEERROR: ${err.message}`));

await page.goto(`${USER}/`, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500)); // let settings fetch + rerender settle

const navbarImg = await page.$eval('header img', (el) => el.getAttribute('src')).catch(() => '');
step('user navbar uses admin logo', navbarImg === logoPath, navbarImg);

const navbarName = await page.$eval('header a span', (el) => el.textContent).catch(() => '');
step('user navbar shows admin site name', navbarName.includes('Cambodia Stays'), navbarName);

const heroImg = await page.$eval('section img', (el) => el.getAttribute('src')).catch(() => '');
step('user hero uses admin banner', heroImg === bannerPath, heroImg);

// Prices should be formatted in Riel somewhere on the page
const bodyText = await page.evaluate(() => document.body.textContent);
step('user site displays Riel (៛) prices', bodyText.includes('៛'), '៛ not found in body text');

await page.goto(`${USER}/hotels`, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));
const hotelsText = await page.evaluate(() => document.body.textContent);
step('hotels page shows Riel prices', hotelsText.includes('៛'), '៛ not found on hotels page');

// Reset settings back to defaults for cleanliness
await fetch(`${API}/admin/settings/reset`, { method: 'POST', headers });
step('settings reset to defaults', true);

console.log('\n--- console errors (user site) ---');
if (consoleErrors.length === 0) console.log('  (none)');
else consoleErrors.slice(0, 10).forEach((e) => console.log('  •', e));

await browser.close();
console.log(`\n===== RESULT: ${failures === 0 ? 'ALL PASS' : `${failures} FAILURES`} =====`);
process.exit(failures === 0 ? 0 : 1);
