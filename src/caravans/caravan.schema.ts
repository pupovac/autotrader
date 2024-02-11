import * as mongoose from 'mongoose';

export const CaravanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  attentionGrabber: { type: String, required: false },
  specs: { type: [String], required: false },
  url: { type: String, required: true },
  pictureUrl: { type: String, required: false },
});
