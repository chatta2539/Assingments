import { Request, Response } from 'express';
import connectorDB from '../utils/ConnectorDB';
import DeviceService from '../services/device.service';
import { Device } from '../models/device.model';

class DeviceController {
    public async createDevice(req: Request, res: Response): Promise<Device> {
        try {
            const deviceService = new DeviceService();
            const devicename  = req.params.name;
            // console.log(devicename)

            const checkExistingDevice = await deviceService.getDeviceByName(devicename);
            if (checkExistingDevice) {
                res.status(409).send({ message: `Device ${devicename} already exists` });
                return
            }else{
                const createDevice = await deviceService.createDevice(devicename);
                res.send({ message: `Device ${devicename} created successfully` });
            }
            return
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

    public async getDeviceByName(req: Request, res: Response): Promise<Device> {
        try {
            const deviceService = new DeviceService();
            const devicename: string  = req.params.name;
            const result = await deviceService.getDeviceByName(devicename) as Device;
            res.json({ result });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };

    public async updateDeviceName(req: Request, res: Response): Promise<Device> {
        try {
            const { _id, devicename } = req.body;
            const deviceService = new DeviceService();
            const updatenewdevice: Device[] = await deviceService.updateNewDeviceName(_id, devicename);
            if (!updatenewdevice) {
                res.status(404).send('Devicename not found');
                return null
            }
            res.send({ message: `Device ${devicename} already updated `, updatenewdevice });
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };

    public async deleteDeviceId(req: Request, res: Response): Promise<Device> {
        try {
            const { _id , devicename } = req.body;
            const deviceService = new DeviceService();
            const deletenewdevice: Device[] = await deviceService.deleteByDeviceId(_id);

            if (!deletenewdevice) {
                res.status(404).send({ message: `Device ${devicename} not found` });
                return null
            } else {
                res.send({ message: `Device ${devicename} already deleted` });
            }} 
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Internal server error' });
            return
        }
    };
}


export default DeviceController;
