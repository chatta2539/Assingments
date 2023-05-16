import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../utils/secretKey';

export const authMiddleware = async (req: Request, res: Response, next: Function ) => {
  try {
          const token = req.headers.authorization.split(' ')[1]
          const decoded = jwt.verify(token, secretKey);
          const userId = decoded.userId;
          if (!userId) {
            // throw 'Invalid user ID';
            res.status(401).json({ message: 'Invalid user ID' });
          } else {
            next();
          }
        } catch {
          res.status(401).json({ message: 'Unauthorized' });
        }
};