import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PageScraperService {
  async scrapeAll(browserInstance: puppeteer.Browser, url: string) {
    let page = await browserInstance.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);

    await page.waitForTimeout(3000); // Wait for 2 seconds

    let listings = await page.$$eval(
      "ul[data-testid='desktop-search'] > li",
      (listElements: any) => {
        return listElements
          .filter((element) => !!element)
          .map((listElement) => {
            let title = listElement
              .querySelector("a[data-testid='search-listing-title'] h3")
              ?.innerText.trim();
            let price = listElement
              .querySelector('.ideECN span span')
              ?.innerText.trim();
            let attentionGrabber = listElement
              .querySelector("[data-testid='search-listing-attention-grabber']")
              ?.innerText.trim();
            let specs = Array.from(
              listElement.querySelectorAll(
                "ul[data-testid='search-listing-specs'] li",
              ),
            ).map((spec: any) => spec.innerText.trim());

            let href = listElement
              .querySelector("a[data-testid='search-listing-title']")
              ?.getAttribute('href');
            let idMatch = href?.match(/\/caravan-details\/(\d+)\?/) ?? null;
            let id = idMatch ? idMatch[1] : null;
            const url = `https://www.autotrader.co.uk/caravan-details/${id}`;

            let pictureElement = listElement.querySelector("picture.jFLCXG");
            let sourceElements = pictureElement
              ? pictureElement.querySelectorAll('source')
              : [];
            let pictureUrl = Array.from(sourceElements)
              .map((source: any) => source.getAttribute('srcset'))
              .map((srcset) => srcset.replace(/\/w\d+h\d+\//, '/w800h600/'))[0];

            return {
              title,
              price,
              attentionGrabber,
              specs,
              id,
              url,
              pictureUrl,
            };
          });
      },
    );

    console.log(listings);
    return listings;
  }
}
