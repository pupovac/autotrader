import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaravansController } from './caravans.controller';
import { CaravansService } from './caravans.service';
import { CaravanSchema } from './caravan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Caravan', schema: CaravanSchema }]),
  ],
  controllers: [CaravansController],
  providers: [CaravansService],
})
export class CaravansModule {}
