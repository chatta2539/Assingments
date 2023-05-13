import { Request, Response } from 'express';
import connectorDB from '../utils/ConnectorDB';
import UserService from '../services/user.service';
import { User } from '../models/user.model';
const bcrypt = require('bcrypt');

class UserController {
    public async getOneByUsername(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const username = req.params.username;
            const user = await userService.getByName(username);
            if (!user) {
                res.status(404).send({ message: 'User not found' });
                return
            } else {
                res.send({ user });
                return
            }
             
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };

    public async getAllUser(req: Request, res: Response): Promise<User> {
        try {
            const userService = new UserService();
            const alluser: User[] = await userService.getAllUser();
            
            res.json({ alluser });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userService = new UserService();
            const { username, password, email} = req.body;

            const checkExistingUser = await userService.getByName(username);
            if (checkExistingUser) {
                res.status(409).send({ error: `User ${username} already exists` });
                return
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUser = await userService.createUser(username, hashedPassword, email)
            if (!createUser) {
                res.status(404).send({ error: 'Failed to create user' });
                return
            } else {
                res.send({ message: 'User created successfully' });
                return
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };
}


export default UserController;
