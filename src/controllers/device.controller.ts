import { Request, Response } from 'express';
import connectorDB from '../utils/ConnectorDB';
import DeviceService from '../services/device.service';
import { Device } from '../models/device.model';

class DeviceController {
    public async createDevice(req: Request, res: Response): Promise<Device> {
        try {
            const deviceService = new DeviceService();
            const { devicename } = req.body;

            const checkExistingDevice = await deviceService.getDeviceByName(devicename);
            if (checkExistingDevice) {
                res.status(409).send({ message: `Device ${devicename} already exists` });
                return
            }
            const createUser = await deviceService.createDevice(devicename)
            if (!createUser) {
                res.status(404).send({ message: 'Failed to create device' });
                return
            } else {
                res.send({ message: `Device ${devicename} created successfully` });
                return
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };

    public async getAllDevice(req: Request, res: Response): Promise<Device> {
        try {
            const deviceService = new DeviceService();
            const alldevice: Device[] = await deviceService.getAllDevice();
            
            res.json({ alldevice });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };
    public async updateDeviceName(req: Request, res: Response): Promise<Device> {
        try {
            const { _id, newdevicename } = req.body;
            const deviceService = new DeviceService();
            const updatenewdevice: Device[] = await deviceService.updateNewDeviceName( _id, newdevicename);
            res.send({ message: `Device ${newdevicename} already updated ` ,updatenewdevice });

            if (!updatenewdevice) {
                res.status(404).send('Devicename not found');
                return null
              }
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };
    // public async getOneByUsername(req: Request, res: Response): Promise<void> {
    //     try {
    //         const deviceService = new DeviceService();
    //         const username = req.params.username;
    //         const user = await userService.getByName(username);
    //         if (!user) {
    //             res.status(404).send({ message: 'User not found' });
    //             return
    //         } else {
    //             res.send({ user });
    //             return
    //         }
             
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send({ message: 'Internal server error' });
    //         return
    //     }
    // };

    

    
}


export default DeviceController;
