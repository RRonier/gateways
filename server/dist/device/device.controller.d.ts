import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Device } from './schemas/device.schema';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    findAll(query: any, res: any): Promise<Device[]>;
    findTodo(res: any, body: any): Promise<any>;
    getTodo(res: any, param: any): Promise<any>;
    create(res: any, createGatewayDto: CreateDeviceDto): Promise<any>;
    updateGateway(param: any, res: any, body: any): Promise<any>;
    deleteGateway(param: any, res: any): Promise<any>;
}
