import connectorDB from '../utils/ConnectorDB';
import { User } from '../models/user.model';

class UserService {
  public async getByName(username: string): Promise<User | null> {
    try{
    const database = connectorDB.db('mydatabase');
    const collection = database.collection('users');
    const result = await collection.findOne({ username });
    if (!result) {
      return null;
    }
    return result;
    }catch (err) {
      console.error(err);
  }
  };

  public async getAllUser(): Promise<User[]> {
    const database = connectorDB.db('mydatabase');
    const collection = database.collection('users');
    const allUser = await collection.find().toArray();
    return allUser
    };

  public async createUser(username: string, password: string, email: string): Promise<User> {
    try{
    const database = connectorDB.db('mydatabase');
      const collection = database.collection('users');
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        await connectorDB.close();
        return existingUser
      }
      const insertdb = await collection.insertOne({ username, password, email });
      
      const resultdb = await collection.findOne({ username });
      await connectorDB.close();
      return resultdb;}
      catch (err) {
        console.error(err);
    };
}};

export default UserService;
