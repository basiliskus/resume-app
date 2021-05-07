import { join } from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import puppeteer from 'puppeteer';

export default async function resumeHtmlToPdf(component, slug) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const html = renderToStaticMarkup(component);
  await page.setContent(html);
  await page.addStyleTag({ path: 'styles/globals.resume.scss' });
  await page.addStyleTag({ path: 'styles/default.resume.scss' });
  await page.evaluateHandle('document.fonts.ready');
  const pdfPath = join(process.cwd(), 'public/pdf', `${slug}.pdf`);
  const pdf = await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
  });
  await browser.close();
  return pdf;
}
