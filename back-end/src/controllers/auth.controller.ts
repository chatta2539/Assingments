import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../utils/secretKey';

class AuthController {
    public async auth(req: Request, res: Response): Promise<void> {
      try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secretKey);
        res.json({message: "authorization success !", decoded});
      } catch (error) {
        res.status(404).send({secretKey, message: 'authorization error'});
      }
    }
  }
  
  export default AuthController;