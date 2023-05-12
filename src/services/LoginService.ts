import connectorDB from '../databases/ConnectorDB';
import { User } from '../models/UserModel';

class LoginService {

  public async findUserByUsername(username: string): Promise<User> {
    const db = await this.mongoConnector.connect();
    const collection = db.collection<User>('users');
    const user = await collection.findOne({ username });
    await this.mongoConnector.close();
    return user;
  }
};

export default LoginService;
