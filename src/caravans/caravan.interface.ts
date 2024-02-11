import { Document } from 'mongoose';

export interface Caravan extends Document {
  title: string;
  price: string;
  attentionGrabber: string;
  specs: string[];
  _id?: string;
  url: string;
  pictureUrl: string;
}
