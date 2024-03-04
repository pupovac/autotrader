import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaravansModule } from './caravans/caravans.module';
import { ScraperModule } from './scraper/scraper.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGODB_URI,
        };
      },
    }),
    // CaravansModule,
    ScheduleModule.forRoot(),
    ScraperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
