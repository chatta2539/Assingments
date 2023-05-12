import { Request, Response } from 'express';
import connectorDB from '../databases/ConnectorDB';
import UserService from '../services/UserService';
import { User } from '../models/UserModel';
class UserController {

    public userServices: UserService;



    constructor() {
        this.userServices = new UserService();
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('users');
            const result = await collection.insertOne(req.body);

            res.status(201).send({ insertedId: result.insertedId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    }

    public async getOneByUsername(req: Request, res: Response): Promise<void> {
        try {
            const username = req.params.username;
            console.log(typeof(username))
            const findUser = await this.userServices.findUserByUsername(username)
            res.send({ findUser });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    }







    // public async getOneByUsername(req: Request, res: Response): Promise<void> {
    //     try {
    //         const username = req.params.username;
    //         const findUser = await this.userService.findUserByUsername(username);
    //         // console.log(username.username)

    //         // const foud = await this.userService.findUserByUsername('raeh')
    //         //   const database = connectorDB.db('mydatabase');
    //         //   const collection = database.collection('users');
    //         //   const user = await collection.findOne({ username });


    //         // res.send({ findUser });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Internal server error');
    //     }
    // }
}

export default UserController;
