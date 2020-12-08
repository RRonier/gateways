import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGatewayDto {
  @ApiProperty({
    required: true,
    example: 'adc8oc524',
    description: 'Gateway serial number',
  })
  @IsNotEmpty()
  readonly serial: string;

  @ApiProperty({
    required: true,
    example: 'Gateway 1',
    description: 'Gateway name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: true,
    example: '192.168.2.2',
    description: 'Gateway IP address',
  })
  @IsIP('4')
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsArray()
  readonly devices: string[];
}
