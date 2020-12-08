import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { Gateway } from './schemas/gateway.schema';
export declare class GatewayController {
    private readonly gatewayService;
    constructor(gatewayService: GatewayService);
    findAll(query: any, res: any): Promise<Gateway[]>;
    findTodo(res: any, body: any): Promise<any>;
    getTodo(res: any, param: any): Promise<any>;
    create(res: any, createGatewayDto: CreateGatewayDto): Promise<any>;
    updateGateway(param: any, res: any, body: any): Promise<any>;
    deleteGateway(param: any, res: any): Promise<any>;
}
