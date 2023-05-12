import connectorDB from '../databases/ConnectorDB';
import { User } from '../models/UserModel';

class UserService {
  public async find(username: string): Promise<User | null> {
    const database = connectorDB.db('mydatabase');
    const collection = database.collection('users');
    const result = await collection.findOne({ username });
    if (!result) {
      return null;
    }
    return result;
  }
}

export default UserService;
