import { Controller, Post, Body, Get } from '@nestjs/common';
import { CaravansService } from './caravans.service';
import { CreateCaravanDto } from './create-caravan.dto';
import { Caravan } from './caravan.interface';

@Controller('caravans')
export class CaravansController {
  constructor(private readonly caravansService: CaravansService) {}

  @Post()
  async create(@Body() createCaravanDto: CreateCaravanDto) {
    return this.caravansService.create(createCaravanDto);
  }

  @Get()
  async findAll(): Promise<Caravan[]> {
    return this.caravansService.findAll();
  }
}
