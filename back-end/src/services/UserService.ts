import connectorDB from '../databases/ConnectorDB';
import { User } from '../models/UserModel';

class UserService {
  public async findByName(username: string): Promise<User | null> {
    const database = connectorDB.db('mydatabase');
    const collection = database.collection('users');
    const result = await collection.findOne({ username });
    if (!result) {
      return null;
    }
    return result;
  };

  public async createUser(username: string, password: string): Promise<User | nill> {
    const db = connectorDB.db('mydatabase');
      const user = db.collection('users');
      const existingUser = await users.findOne({ username });
      if (existingUser) {
        await connectorDB.close();
        return res.status(400).send('Username already exists');
      }
      const result = await users.insertOne({ username, password: hashedPassword });
      
      const result = await collection.findOne({ username });
      
      res.send('User created successfully');
      await connectorDB.close();
};
};

export default UserService;
