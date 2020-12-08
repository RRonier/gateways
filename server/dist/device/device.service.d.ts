import { Model } from 'mongoose';
import { Gateway } from '../gateway/schemas/gateway.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './schemas/device.schema';
export declare class DeviceService {
    private readonly deviceModel;
    private readonly gatewayModel;
    constructor(deviceModel: Model<Device>, gatewayModel: Model<Gateway>);
    findAll(query: any): Promise<{
        results: Device[];
        links: {
            previous: boolean;
            next: boolean;
        };
        total: number;
    }>;
    findOne(options: object): Promise<Device>;
    findById(ID: number): Promise<Device>;
    create(createDeviceDto: CreateDeviceDto): Promise<Device>;
    update(ID: number, newValue: Device): Promise<Device>;
    delete(ID: number): Promise<Device>;
    countDevicesAdded(IdGateway: number): Promise<number>;
}
