import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Caravan } from './caravan.interface';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CaravansService {
  constructor(
    @InjectModel('Caravan') private readonly caravanModel: Model<Caravan>,
  ) {}

  async create(caravan: Caravan): Promise<Caravan> {
    const priceInEuros = this.convertPriceToEuros(caravan.price);
    const dto: Caravan = {
      externalId: caravan.externalId,
      title: caravan.title,
      price: `${priceInEuros.toFixed(0)}€`,
      attentionGrabber: caravan.attentionGrabber,
      specs: caravan.specs,
      url: caravan.url,
      pictureUrl: caravan.pictureUrl,
    };
    const existingCaravan = await this.caravanModel.findOne({
      externalId: caravan.externalId,
    });
    if (existingCaravan) {
      return await this.caravanModel.findOneAndUpdate(
        { externalId: caravan.externalId },
        dto,
        { new: true },
      );
    } else {
      const createdCaravan = new this.caravanModel(caravan);
      await createdCaravan.save();

      await this.sendEmail(dto);
      return createdCaravan;
    }
  }

  async findAll(): Promise<Caravan[]> {
    return this.caravanModel.find().exec();
  }

  private convertPriceToEuros(priceInPounds: string): number {
    const exchangeRate = 1.17;
    const numericValue = parseFloat(priceInPounds.replace(/[^0-9.-]+/g, ''));
    const priceInEuros = numericValue * exchangeRate;
    return priceInEuros;
  }

  private async sendEmail(caravan: Caravan) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'openairpenthouse@gmail.com',
        pass: 'gjbi yxzu quem vhub',
      },
    });

    const emailContent = this.createEmailBody(caravan);

    const mailOptions = {
      from: "openairpenthouse@gmail.com",
      to: "pupovacalex@gmail.com",
      subject: "New Caravan on AutoTrader",
      html: emailContent,
    };
  
    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }

  private createEmailBody(caravan: Caravan) {
    const emailContent = `
  <html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 800px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      .header {
        background-color: #3498db;
        color: #fff;
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #ddd;
      }
  
      .content {
        padding: 20px;
      }
  
      .listing {
        display: flex;
        margin-bottom: 20px;
      }
  
      .picture {
        flex: 1;
        margin-right: 20px;
      }
  
      .picture img {
        max-width: 100%;
        border-radius: 5px;
      }
  
      .info {
        flex: 2;
      }
  
      .info h2 {
        color: #333;
      }
  
      .info p {
        color: #777;
      }
  
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #3498db;
        color: #fff;
        border-top: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Caravan Listing Information</h1>
      </div>
  
      <div class="content">
        <div class="listing">
          <div class="picture">
            <img src="${caravan.pictureUrl}" alt="${caravan.title}">
          </div>
          <div class="info">
            <h2>${caravan.title}</h2>
            <p><strong>Price:</strong> ${caravan.price}</p>
            <p><strong>Attention Grabber:</strong> ${
              caravan.attentionGrabber
            }</p>
            <p><strong>Specs:</strong></p>
            <ul>
              ${caravan.specs.map((spec) => `<li>${spec}</li>`).join('')}
            </ul>
            <p><strong>ID:</strong> ${caravan.externalId}</p>
            <p><strong>URL:</strong> <a href="${caravan.url}">${
              caravan.url
            }</a></p>
          </div>
        </div>
      </div>
  
      <div class="footer">
        <p>Thank you for using our service!</p>
      </div>
    </div>
  </body>
  </html>
  
  `;
    return emailContent;
  }
}
