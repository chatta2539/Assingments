import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { User } from '../models/user.model';
import Login from '../models/login.model';
import UserService from '../services/user.service';
import {secretKey} from '../utils/secretKey';
class LoginController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const { username, password } = req.body;

      // Find the user in the database by their username
      const userdata = await userService.getByName(username);
      if (!userdata) {
        res.status(401).send({ message: 'Invalid username not found'})
        return ;
      }
     
      // Compare the hashed password with the user's input using bcrypt
      const passwordMatches = await bcrypt.compare(password, userdata.password);
      if (!passwordMatches) {
        res.status(401).send({ message: 'Invalid password'});
        return 
      }
      // Generate a JWT token with the user's ID and a 60-minute TTL
      const token = jwt.sign({ userId: userdata._id }, secretKey, { expiresIn: '60m' });

      // Return the JWT token to the client
      res.send({ token, username: userdata.username });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in'});
    }
  }
}

export default LoginController;
