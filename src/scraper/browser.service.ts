import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class BrowserService {
  async startBrowser() {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
        executablePath: '/usr/bin/google-chrome'
      });
    } catch (err) {
      console.log('Could not create a browser instance => : ', err);
    }
    return browser;
  }

  async closeBrowser(browser: puppeteer.Browser) {
    if (browser) {
      await browser.close();
      console.log('Browser closed');
    }
  }
}