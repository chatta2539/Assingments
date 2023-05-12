
import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';


class UsersRoute {
    public path = '/user';
    public router = Router();
    public userController = new UserController();
    public UserService = new UserService();
    
  
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}`, this.userController.getOneByChettha);
        this.router.get(`${this.path}/:username`, this.userController.getOneByUsername);
    }
}

export default UsersRoute;
