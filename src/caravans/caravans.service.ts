import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Caravan } from './caravan.interface';
import { CreateCaravanDto } from './create-caravan.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CaravansService {
  constructor(
    @InjectModel('caravan') private readonly caravanModel: Model<Caravan>,
  ) {}

  async create(createCaravanDto: CreateCaravanDto): Promise<Caravan> {
    const existingCaravan = await this.caravanModel.findOne({
      id: createCaravanDto._id,
    });

    if (!existingCaravan) {
      const createdCaravan = new this.caravanModel(createCaravanDto);
      await createdCaravan.save();

      //   const transporter = nodemailer.createTransport({
      //     // configure nodemailer transporter
      //   });

      //   const mailOptions = {
      //     // configure email options
      //   };

      //   transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //       console.error(error);
      //     } else {
      //       console.log('Email sent: ' + info.response);
      //     }
      //   });

      return createdCaravan;
    }

    return existingCaravan;
  }

  async findAll(): Promise<Caravan[]> {
    return this.caravanModel.find().exec();
  }
}
