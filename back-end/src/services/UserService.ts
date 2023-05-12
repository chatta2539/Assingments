// import { Request, Response } from 'express';
// import connectorDB from '../databases/ConnectorDB';
// import { User } from '../models/UserModel';



// class UserService {
//     public async getOneByUsername(username: string): Promise<null> {
//         try {

//             const database = connectorDB.db('mydatabase');
//             const collection = database.collection('users');
//             const user = await collection.findOne({ username });

//             return user;
//         }catch (err) {
//             console.error(err);
//         }

//     // public async findUserByUsername(username: string): Promise<User> {
//     //     console.log("UserService" + username)
//     //     const database = connectorDB.db('mydatabase');
//     //     const collection = database.collection('users');
//     //     const result = await  collection.findOne({ username });
//     //     if (!result) {
//     //         return null;
//     //     }
//     //     // res.send({ result });
//     //     return new User(result._id, result.username, result.password);
//     // }
// }};

// export default UserService;


import connectorDB from '../databases/ConnectorDB';
import { User } from '../models/UserModel';

class UserService {
  public async findUserByUsername(username: string): Promise<User | null> {
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
