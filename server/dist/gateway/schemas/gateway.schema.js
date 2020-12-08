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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySchema = exports.Gateway = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const device_schema_1 = require("../../device/schemas/device.schema");
let Gateway = class Gateway extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Gateway.prototype, "serial", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Gateway.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({
        required: true,
        validate: [
            /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
            'Invalid IPV4 address.',
        ],
    }),
    __metadata("design:type", String)
], Gateway.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop([{ type: mongoose_2.Schema.Types.ObjectId, ref: device_schema_1.Device }]),
    __metadata("design:type", Array)
], Gateway.prototype, "devices", void 0);
Gateway = __decorate([
    mongoose_1.Schema()
], Gateway);
exports.Gateway = Gateway;
exports.GatewaySchema = mongoose_1.SchemaFactory.createForClass(Gateway);
//# sourceMappingURL=gateway.schema.js.map