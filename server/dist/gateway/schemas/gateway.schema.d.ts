import { Document, Schema as MongooseSchema } from 'mongoose';
import { Device } from '../../device/schemas/device.schema';
export declare class Gateway extends Document {
    serial: string;
    name: string;
    address: string;
    devices: [Device];
}
export declare const GatewaySchema: MongooseSchema<any>;
