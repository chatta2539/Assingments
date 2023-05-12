import { ObjectId } from 'mongodb';

export default interface LoginUser {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
}