import { join } from 'path';
import puppeteer from 'puppeteer';

import { getResumeSlugs } from '../lib/api.mjs';

const server = process.env.SERVER
  ? process.env.SERVER
  : 'http://localhost:3000';
const localPdfFolderPath = './public/pdf';
console.log(`Server trying to connect: ${server}`);

async function generatePdf(slug) {
  const url = `${server}/resume/html/${slug}`;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: join(localPdfFolderPath, `${slug}.pdf`),
    printBackground: true,
    format: 'A4',
  });
  await browser.close();
}

const slugs = getResumeSlugs();
for (const slug of slugs) {
  generatePdf(slug)
    .then(() => console.log(`Successfully created ${slug}.pdf`))
    .catch((err) => console.error(err));
}
