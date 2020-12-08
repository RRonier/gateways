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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gateway_schema_1 = require("../gateway/schemas/gateway.schema");
const device_schema_1 = require("./schemas/device.schema");
let DeviceService = class DeviceService {
    constructor(deviceModel, gatewayModel) {
        this.deviceModel = deviceModel;
        this.gatewayModel = gatewayModel;
    }
    async findAll(query) {
        const { page = 1, limit = 10, idGateway } = query;
        const where = { idGateway: idGateway };
        const skip = (+page - 1) * +limit;
        const sort = { name: 'desc' } || undefined;
        if (page < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'The page must be greater than 0',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        if (limit < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'The limit must be greater than 0',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const items = await this.deviceModel
            .find()
            .where(where)
            .skip(skip)
            .limit(+limit)
            .sort(sort)
            .exec();
        const total = items.length;
        return {
            results: items,
            links: {
                previous: skip > 0 && items.length > 0 ? true : false,
                next: +limit + skip < total ? true : false,
            },
            total,
        };
    }
    async findOne(options) {
        const device = await this.deviceModel.findOne(options).exec();
        if (!device) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Device not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return device;
    }
    async findById(ID) {
        const device = await this.deviceModel.findById(ID).exec();
        if (!device) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Device not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return device;
    }
    async create(createDeviceDto) {
        const device = await this.deviceModel
            .findOne({ uid: createDeviceDto.uid })
            .exec();
        if (device) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'UID must be unique',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const { idGateway } = createDeviceDto, rest = __rest(createDeviceDto, ["idGateway"]);
        const countDevices = await this.countDevicesAdded(idGateway);
        if (countDevices > 9) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: `Gateway can't exeded 10 devices`,
            }, common_1.HttpStatus.CONFLICT);
        }
        const createdDevice = new this.deviceModel(createDeviceDto);
        const resultDevice = await createdDevice.save();
        await this.gatewayModel.findOneAndUpdate({ _id: idGateway }, { $push: { devices: resultDevice } });
        return resultDevice;
    }
    async update(ID, newValue) {
        const device = await this.deviceModel.findById(ID).exec();
        if (!device) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Device not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.deviceModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.deviceModel.findById(ID).exec();
    }
    async delete(ID) {
        return await this.deviceModel.findByIdAndRemove(ID).exec();
    }
    async countDevicesAdded(IdGateway) {
        const gateway = await this.gatewayModel.findById(IdGateway).exec();
        if (gateway) {
            return gateway.devices.length;
        }
        return 0;
    }
};
DeviceService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(device_schema_1.Device.name)),
    __param(1, mongoose_1.InjectModel(gateway_schema_1.Gateway.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map