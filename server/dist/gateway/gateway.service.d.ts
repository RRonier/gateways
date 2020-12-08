import { Gateway } from './schemas/gateway.schema';
import { Model } from 'mongoose';
import { CreateGatewayDto } from './dto/create-gateway.dto';
export declare class GatewayService {
    private readonly gatewayModel;
    constructor(gatewayModel: Model<Gateway>);
    findAll(query: any): Promise<{
        results: Gateway[];
        links: {
            previous: boolean;
            next: boolean;
        };
        total: number;
    }>;
    findOne(options: object): Promise<Gateway>;
    findById(ID: number): Promise<Gateway>;
    create(createGatewayDto: CreateGatewayDto): Promise<Gateway>;
    update(ID: number, newValue: Gateway): Promise<Gateway>;
    delete(ID: number): Promise<Gateway>;
}
