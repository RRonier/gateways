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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const device_service_1 = require("./device.service");
const create_device_dto_1 = require("./dto/create-device.dto");
const device_schema_1 = require("./schemas/device.schema");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    async findAll(query, res) {
        const gateways = await this.deviceService.findAll(query);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async findTodo(res, body) {
        const queryCondition = body;
        const gateways = await this.deviceService.findOne(queryCondition);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async getTodo(res, param) {
        const gateways = await this.deviceService.findById(param.id);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async create(res, createGatewayDto) {
        const gateways = await this.deviceService.create(createGatewayDto);
        return res.status(common_1.HttpStatus.OK).json(gateways);
    }
    async updateGateway(param, res, body) {
        const device = await this.deviceService.update(param.id, body);
        return res.status(common_1.HttpStatus.OK).json(device);
    }
    async deleteGateway(param, res) {
        const device = await this.deviceService.delete(param.id);
        if (!device) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Device not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return res.status(common_1.HttpStatus.OK).json(device);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Retrieve all Devices' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get all Devices data',
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
], DeviceController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Find device by query' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found device',
        type: device_schema_1.Device,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Device not found',
    }),
    common_1.Get('find'),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "findTodo", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Find device by id' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'The found device',
        type: device_schema_1.Device,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Device not found',
    }),
    common_1.Get('/:id'),
    __param(0, common_1.Response()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getTodo", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Create device' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Device created',
        type: device_schema_1.Device,
    }),
    swagger_1.ApiBadGatewayResponse({
        description: 'They are not allowed more than 10 devices per gateway',
    }),
    common_1.Post(),
    __param(0, common_1.Response()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Update device' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Device updated',
        type: device_schema_1.Device,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Device not found',
    }),
    common_1.Patch('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "updateGateway", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Delete device' }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Device deleted',
        type: device_schema_1.Device,
    }),
    swagger_1.ApiNotFoundResponse({
        description: 'Device not found',
    }),
    common_1.Delete('/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "deleteGateway", null);
DeviceController = __decorate([
    swagger_1.ApiTags('Devices'),
    common_1.Controller('devices'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map