import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { BrowserService } from './browser.service';
import { PageScraperService } from './page-scraper.service';
import { CaravansModule } from 'src/caravans/caravans.module';
import { CaravansService } from 'src/caravans/caravans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CaravanSchema } from 'src/caravans/caravan.schema';
import { ScraperScheduler } from './scraper.scheduler';

@Module({
  controllers: [ScraperController],
  providers: [
    ScraperService,
    BrowserService,
    PageScraperService,
    CaravansService,
    ScraperScheduler,
  ],
  imports: [
    CaravansModule,
    MongooseModule.forFeature([{ name: 'Caravan', schema: CaravanSchema }]),
  ],
})
export class ScraperModule {}
