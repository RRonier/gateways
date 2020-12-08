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
exports.CreateGatewayDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGatewayDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: true,
        example: 'adc8oc524',
        description: 'Gateway serial number',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateGatewayDto.prototype, "serial", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        example: 'Gateway 1',
        description: 'Gateway name',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGatewayDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        example: '192.168.2.2',
        description: 'Gateway IP address',
    }),
    class_validator_1.IsIP('4'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateGatewayDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreateGatewayDto.prototype, "devices", void 0);
exports.CreateGatewayDto = CreateGatewayDto;
//# sourceMappingURL=create-gateway.dto.js.map