
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginController from '../controllers/login.controller';
import AuthController from '../controllers/auth.controller';
import DeviceController from '../controllers/device.controller';
// import UserService from '../services/user.service';
// import Login

// import LoginService from '../services/login.service';


class UsersRoute {
    public pathUser = '/user';
    public pathLogin = '/login';
    public pathAuth = '/auth';
    public pathDevice = '/device';
    public router = Router();
    public userController = new UserController();
    public loginController = new LoginController();
    public authController = new AuthController();
    public deviceController = new DeviceController();


    
  
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.pathUser}/alluser`, this.userController.getAllUser);
        this.router.get(`${this.pathUser}/:username`, this.userController.getOneByUsername);
        this.router.post(`${this.pathUser}`, this.userController.createUser);

        this.router.post(`${this.pathLogin}`, this.loginController.login);
        this.router.post(`${this.pathAuth}`, this.authController.auth);
        
        this.router.put(`${this.pathDevice}`, this.deviceController.updateDeviceName);
        this.router.get(`${this.pathDevice}/alldevice`, this.deviceController.getAllDevice);
        this.router.post(`${this.pathDevice}`, this.deviceController.createDevice);

    }
}

export default UsersRoute;
