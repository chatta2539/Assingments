import { ObjectId } from 'mongodb';

export interface Device {
  _id: ObjectId;
  devicename: string;
}