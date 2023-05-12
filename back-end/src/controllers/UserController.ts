import { Request, Response } from 'express';
import connectorDB from '../databases/ConnectorDB';
import UserService from '../services/UserService';
import { User } from '../models/UserModel';
const bcrypt = require('bcrypt');

class UserController {
    public async getOneByUsername(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const username = req.params.username;
            const user = await userService.findByName(username);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.send({ user });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    };

    public async createUser(req: Request, res: Response): Promise<void>{
        try {
            const userService = new UserService();
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUser = await userService.createUser(username, hashedPassword)
            if (!createUser) {
                res.status(404).send('User not found');
            } else {
                res.send('User created successfully');
            }}
        catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }};
}

    // public async getOneByUsername(req: Request, res: Response): Promise<void> {
    //     try {
    //         const username = req.params.username;
    //         console.log(typeof(username))
    //         const findUser = await this.userServices.findUserByUsername(username)
    //         res.send({ findUser });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Internal server error');
    //     }
    // }




    // public async getOneByUsername(req: Request, res: Response): Promise<void> {
    //     try {
    //         const username = req.params.username;
    //         // const findUser = await this.userService.findUserByUsername(username);
    //         const database = connectorDB.db('mydatabase');
    //         const collection = database.collection('users');
    //         const user = await collection.findOne({ username });
    //         res.send({ user });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Internal server error');
    //     }
    // }


    // public async create(req: Request, res: Response): Promise<void> {
    //     try {
    //         const database = connectorDB.db('mydatabase');
    //         const collection = database.collection('users');
    //         const result = await collection.insertOne(req.body);

    //         res.status(201).send({ insertedId: result.insertedId });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Internal server error');
    //     }
    // }




export default UserController;
