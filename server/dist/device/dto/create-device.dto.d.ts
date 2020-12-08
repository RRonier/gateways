import { DeviceStatus } from '../enum/device.enum';
export declare class CreateDeviceDto {
    readonly idGateway: number;
    readonly uid: number;
    readonly vendor: string;
    readonly status: DeviceStatus;
}
