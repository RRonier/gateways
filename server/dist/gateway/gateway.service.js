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
exports.GatewayService = void 0;
const gateway_schema_1 = require("./schemas/gateway.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let GatewayService = class GatewayService {
    constructor(gatewayModel) {
        this.gatewayModel = gatewayModel;
    }
    async findAll(query) {
        const { page = 1, limit = 10, search } = query;
        const where = {};
        const skip = (+page - 1) * +limit;
        const sort = { createdAt: 'desc' };
        if (search) {
            where['name'] = { $regex: '.*' + search.toLowerCase() + '.*' };
        }
        if (page < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The page must be greater than 0',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (limit < 1) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'The limit must be greater than 0',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const items = await this.gatewayModel
            .find(where)
            .skip(skip)
            .limit(+limit)
            .sort(sort)
            .populate({ path: 'devices', model: 'Device' })
            .exec();
        const total = !search
            ? await this.gatewayModel.countDocuments()
            : items.length;
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
        const gateway = await this.gatewayModel
            .findOne(options)
            .populate({ path: 'devices', model: 'Device' })
            .exec();
        if (!gateway) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return gateway;
    }
    async findById(ID) {
        const gateway = await this.gatewayModel
            .findById(ID)
            .populate({ path: 'devices', model: 'Device' })
            .exec();
        if (!gateway) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return gateway;
    }
    async create(createGatewayDto) {
        const gateway = await this.gatewayModel
            .findOne({ serial: createGatewayDto.serial })
            .exec();
        if (gateway) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Serial Number must be unique',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const createdGateway = new this.gatewayModel(createGatewayDto);
        return createdGateway.save();
    }
    async update(ID, newValue) {
        const gateway = await this.gatewayModel.findById(ID).exec();
        if (!gateway) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Gateway not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        await this.gatewayModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.gatewayModel.findById(ID).exec();
    }
    async delete(ID) {
        return await this.gatewayModel.findByIdAndRemove(ID).exec();
    }
};
GatewayService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(gateway_schema_1.Gateway.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map