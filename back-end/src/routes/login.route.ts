import { Router } from 'express';
import LoginController from '../controllers/login.controller';

import { authMiddleware } from '../middlewares/auth.middleware'
import AuthController from '../controllers/auth.controller';

class LoginRoute {
    public pathLogin = '/login';
    public router = Router();
    public loginController = new LoginController();
    public authController = new AuthController();
    

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.pathLogin}`, this.loginController.login);
        this.router.post(`${this.pathLogin}/auth`,authMiddleware , this.authController.auth);
    }
}
export default LoginRoute;
