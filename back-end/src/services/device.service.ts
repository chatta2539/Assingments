import connectorDB from '../utils/ConnectorDB';
import { Device } from '../models/device.model';
import { ObjectId } from 'mongodb';

class DeviceService {

    public async createDevice(devicename: string): Promise<Device> {
        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('devices');
            const existingDevice = await collection.findOne({ devicename });
            if (existingDevice) {
                return existingDevice
            }
            const insertdb = await collection.insertOne({ devicename });
            const resultdb = await collection.findOne({ devicename });
            return resultdb;
        }
        catch (err) {
            console.log(err);
        } 
        finally {
            // await connectorDB.close();
        }
    };

    public async getDeviceByName(devicename: string): Promise<Device | null> {
        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('devices');
            const result = await collection.findOne({ devicename });
            if (!result) {
                return null;
            }
            return result;
        } 
        catch (err) {
            console.log(err);
        } 
        finally {
            // await connectorDB.close();
        }
    };

    public async getAllDevice(): Promise<Device[]> {

        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('devices');
            const allDevice = await collection.find().toArray();

            if (!allDevice) {
                return null;
            }
            return allDevice;
        } 
        catch (err) {
            console.log(err);
        } 
        finally {
            // await connectorDB.close();
        }
    };

    public async updateNewDeviceName(id: string, newUsername: string): Promise<Device[]> {
        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('devices');
            const updatenewdevice = await collection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { devicename: newUsername } },
                { returnOriginal: false },
            );

            if (!updatenewdevice) {
                return null;
            }
            return updatenewdevice.value;
        } catch (err) {
            console.log(err);
        } finally {
            // await connectorDB.close();
        }
    };

    public async deleteByDeviceId(id: string): Promise<Device[]> {
        try {
            const database = connectorDB.db('mydatabase');
            const collection = database.collection('devices');
            const deletenewdevice = await collection.deleteOne(
                { _id: new ObjectId(id) }
            );
            if (deletenewdevice.deletedCount === 1){
                return deletenewdevice;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
        } finally {
            // await connectorDB.close();
        }
    };
};

export default DeviceService;
