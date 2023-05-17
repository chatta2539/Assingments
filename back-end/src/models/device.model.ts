import { ObjectId } from 'mongodb';

export interface Device {
  _id: ObjectId;
  deviceName: string;
}