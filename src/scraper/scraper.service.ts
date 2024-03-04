import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { PageScraperService } from './page-scraper.service';
import { CaravansService } from 'src/caravans/caravans.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly browserService: BrowserService,
    private readonly pageScraperService: PageScraperService,
    private readonly caravansService: CaravansService,
  ) {}

  async scrape(url: string) {
    const browserInstance = await this.browserService.startBrowser();
    const caravans = await this.pageScraperService.scrapeAll(browserInstance, url);
    await this.browserService.closeBrowser(browserInstance);
    for (const caravan of caravans) {
      if (caravan?.id) {
        caravan.externalId = caravan?.id;
        await this.caravansService.create(caravan);
      }
    }
    return caravans;
  }
}
