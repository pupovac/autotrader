import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperService } from './scraper.service';

const AUTOTRADER_URLS = [
  {
    make: 'BAILEY',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=BAILEY&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'SWIFT',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=SWIFT&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'COACHMAN',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=COACHMAN&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'ELDDIS',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=ELDDIS&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'LUNAR',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=LUNAR&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'SPRITE',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=SPRITE&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
  {
    make: 'STERLING',
    url: 'https://www.autotrader.co.uk/caravan-search?advertising-location=at_caravans&berth=2&make=STERLING&postcode=EC2V%207HH&price-to=13000&radius=200&sort=most-recent&style=TOURING%20CARAVAN',
  },
];

@Injectable()
export class ScraperScheduler {
  constructor(private readonly scraperService: ScraperService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    for (const url of AUTOTRADER_URLS) {
      console.log(`-----------------------------STARTED SCRAPER FOR ${url.make} --------------------------------------------`);
      await this.scraperService.scrape(url.url);
      console.log(`-----------------------------FINISHED SCRAPER FOR ${url.make} --------------------------------------------`);
    }
  }
}
