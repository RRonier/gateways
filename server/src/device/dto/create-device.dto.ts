import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { DeviceStatus } from '../enum/device.enum';

export class CreateDeviceDto {
  @ApiProperty({
    required: true,
    example: '5f98edf39be42355ueeocc5a769b',
    description: 'Gateway id',
  })
  @IsNotEmpty()
  readonly idGateway: number;

  @ApiProperty({
    required: true,
    example: 'b87hd',
    description: 'Device uid',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly uid: number;

  @ApiProperty({
    required: true,
    example: 'Vendor 1',
    description: 'Device vendor',
  })
  @IsNotEmpty()
  @IsString()
  readonly vendor: string;

  @ApiProperty({
    required: true,
    enum: DeviceStatus,
    enumName: 'Status',
    description: 'Device status',
  })
  @IsEnum(DeviceStatus)
  readonly status: DeviceStatus;
}
