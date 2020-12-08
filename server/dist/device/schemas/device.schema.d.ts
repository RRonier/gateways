import { Document } from 'mongoose';
import { DeviceStatus } from '../enum/device.enum';
export declare class Device extends Document {
    uid: number;
    vendor: string;
    status: DeviceStatus;
    idGateway: string;
}
export declare const DeviceSchema: import("mongoose").Schema<any>;
