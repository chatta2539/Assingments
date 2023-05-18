import connectorDB from '../utils/ConnectorDB';
import { User } from '../models/user.model';
import { ObjectId } from 'mongodb';


class UserService {
  public async getByName(username: string): Promise<User | null> {
    try {
      const database = connectorDB.db('mydatabase');
      const collection = database.collection('users');
      // console.log(username)
      const result = await collection.findOne({ username });
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  public async getByNameId(userId: string): Promise<User | null> {
    try {
      
      const database = connectorDB.db('mydatabase');
      const collection = database.collection('users');
      const result = await collection.findOne({ _id: new ObjectId(userId) });
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  public async getAllUser(): Promise<User[]> {
    try {
      const database = connectorDB.db('mydatabase');
      const collection = database.collection('users');
      const allUser = await collection.find().toArray();

      if (!allUser) {
        return null;
      }
      return allUser;
    } catch (err) {
      console.log(err);
    }
  };

  public async createUser(username: string, password: string, email: string): Promise<User> {
    try {
      const database = connectorDB.db('mydatabase');
      const collection = database.collection('users');
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        return existingUser
      }
      const insertdb = await collection.insertOne({ username, password, email });

      const resultdb = await collection.findOne({ username });
      return resultdb;
    }
    catch (err) {
      console.error(err);
    };
  }
};

export default UserService;
