
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginController from '../controllers/login.controller';
import AuthController from '../controllers/auth.controller'
// import UserService from '../services/user.service';
// import Login

// import LoginService from '../services/login.service';


class UsersRoute {
    public pathUser = '/user';
    public pathLogin = '/login';
    public pathAuth = '/auth';
    public router = Router();
    public userController = new UserController();
    public loginController = new LoginController();
    public authController = new AuthController();


    
  
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.pathUser}/alluser`, this.userController.getAllUser);
        this.router.get(`${this.pathUser}/:username`, this.userController.getOneByUsername);
        this.router.post(`${this.pathUser}`, this.userController.createUser);

        this.router.post(`${this.pathLogin}`, this.loginController.login);
        this.router.post(`${this.pathAuth}`, this.authController.auth);
    }
}

export default UsersRoute;
