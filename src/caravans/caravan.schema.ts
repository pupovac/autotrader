import { Schema } from 'mongoose';

export const CaravanSchema = new Schema({
  title: { type: String, required: true },
  attentionGrabber: { type: String, required: false },
  specs: { type: [String], required: true },
  externalId: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: String, default: '0' },
  pictureUrl: { type: String },
});
