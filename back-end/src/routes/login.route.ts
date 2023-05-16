import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { authMiddleware } from '../middlewares/auth.middleware'

class LoginRoute {
    public pathLogin = '/login';
    public router = Router();
    public loginController = new LoginController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.pathLogin}`, this.loginController.login);
    }
}
export default LoginRoute;
