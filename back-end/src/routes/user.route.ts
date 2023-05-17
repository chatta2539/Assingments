import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware'

class UserRoute {
    
    public router = Router();
    public pathUser = '/user';
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.pathUser}`, authMiddleware, this.userController.getAllUser);
        this.router.get(`${this.pathUser}/:id`, authMiddleware, this.userController.getOneByUserId);
        this.router.get(`${this.pathUser}/name/:username`, authMiddleware, this.userController.getOneByUsername);
        this.router.post(`${this.pathUser}`, authMiddleware, this.userController.createUser);
    }
}
export default UserRoute;
