import { Router } from 'express';
import DeviceController from '../controllers/device.controller';
import { authMiddleware } from '../middlewares/auth.middleware'

class DeviceRoute {
    public pathDevice = '/device';
    public router = Router();
    public deviceController = new DeviceController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.pathDevice}`, authMiddleware, this.deviceController.getAllDevice);
        this.router.get(`${this.pathDevice}/:name`, authMiddleware, this.deviceController.getDeviceByName);
        this.router.put(`${this.pathDevice}`, authMiddleware, this.deviceController.updateDeviceName);
        this.router.post(`${this.pathDevice}/:name`, authMiddleware, this.deviceController.createDevice);
        this.router.delete(`${this.pathDevice}/:id`, authMiddleware, this.deviceController.deleteDeviceId);
    }
}
export default DeviceRoute;
