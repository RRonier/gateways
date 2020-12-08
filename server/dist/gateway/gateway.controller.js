"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("./gateway.service");
const create_gateway_dto_1 = require("./dto/create-gateway.dto");
const gateway_schema_1 = require("./schemas/gateway.schema");
const swagger_1 = require("@nestjs/swagger");
let GatewayController = class GatewayController {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    async findAll(query, res) {
        const gateways = await this.gatewayService.findAll(query);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async findTodo(res, body) {
        const queryCondition = body;
        const gateways = await this.gatewayService.findOne(queryCondition);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async getTodo(res, param) {
        const gateways = await this.gatewayService.findById(param.id);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async create(res, createGatewayDto) {
        const gateways = await this.gatewayService.create(createGatewayDto);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async updateGateway(param, res, body) {
        const gateway = await this.gatewayService.update(param.id, body);
        return res.status(common_1.HttpStatus.OK).json(gateway);
    }
    async deleteGateway(param, res) {
        const gateway = await this.gatewayService.delete(param.id);
        if (!gateway) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return res.status(common_1.HttpStatus.OK).json(gateway);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve all Gateways' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get all Gateways data',
        schema: {
            properties: {
                items: {
                    type: 'array',
                },
                hasPreviousPage: {
                    type: 'boolean',
                },
                hasNextPage: {
                    type: 'boolean',
                },
                total: {
                    type: 'number',
                },
            },
        },
    }),
    swagger_1.ApiForbiddenResponse({
        description: 'The page must be greater than 0 or The limit must be greater than 0',
    }),
    common_1.Get(),
    __param(0, common_1.Query()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Find gateway by query' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found gateway',
        type: gateway_schema_1.Gateway,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Gateway not found',
    }),
    common_1.Get('find'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findTodo", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Find gateway by id' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Gateway found',
        type: gateway_schema_1.Gateway,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Gateway not found',
    }),
    common_1.Get('/:id'),
    __param(0, common_1.Response()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTodo", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Create gateway' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Gateway created',
        type: gateway_schema_1.Gateway,
    }),
    common_1.Post(),
    __param(0, common_1.Response()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_gateway_dto_1.CreateGatewayDto]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Update gateway' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Gateway updated',
        type: gateway_schema_1.Gateway,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Gateway not found',
    }),
    common_1.Patch('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updateGateway", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Delete gateway' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Gateway deleted',
        type: gateway_schema_1.Gateway,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Gateway not found',
    }),
    common_1.Delete('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "deleteGateway", null);
GatewayController = __decorate([
    swagger_1.ApiTags('Gateways'),
    common_1.Controller('gateways'),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayController);
exports.GatewayController = GatewayController;
//# sourceMappingURL=gateway.controller.js.map