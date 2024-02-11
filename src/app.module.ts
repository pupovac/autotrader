import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaravansModule } from './caravans/caravans.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGODB_URI,
        };
      },
    }),
    CaravansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
