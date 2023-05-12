
import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
// import Login
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';


class UsersRoute {
    public pathUser = '/user';
    public pathLogin = '/login';
    public router = Router();
    public userController = new UserController();
    public userService = new UserService();
    public loginController = new LoginController();
    public loginService = new LoginController();


    
  
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.pathUser}/alluser`, this.userController.getAllUser);
        this.router.get(`${this.pathUser}/:username`, this.userController.getOneByUsername);
        this.router.post(`${this.pathUser}`, this.userController.createUser);

        this.router.post(`${this.pathLogin}`, this.loginController.login);
    }
}

export default UsersRoute;
