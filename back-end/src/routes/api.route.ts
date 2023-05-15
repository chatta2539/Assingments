
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import LoginController from '../controllers/login.controller';
import AuthController from '../controllers/auth.controller';
import DeviceController from '../controllers/device.controller';
import { authMiddleware } from '../middlewares/auth.middleware'



class ApiRoute {
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
        this.router.get(`${this.pathUser}/alluser`, authMiddleware, this.userController.getAllUser);
        this.router.get(`${this.pathUser}/userid`, authMiddleware, this.userController.getOneByUserId);
        this.router.get(`${this.pathUser}/username`, authMiddleware, this.userController.getOneByUsername);
        this.router.post(`${this.pathUser}`, authMiddleware, this.userController.createUser);

        this.router.post(`${this.pathLogin}`, this.loginController.login);
        this.router.post(`${this.pathAuth}`, this.authController.auth);

        this.router.delete(`${this.pathDevice}`, authMiddleware, this.deviceController.deleteDeviceId);
        this.router.put(`${this.pathDevice}`, authMiddleware, this.deviceController.updateDeviceName);
        this.router.get(`${this.pathDevice}/alldevice`, authMiddleware, this.deviceController.getAllDevice);
        this.router.post(`${this.pathDevice}`, authMiddleware, this.deviceController.createDevice);
    }
}
export default ApiRoute;
