"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let MongooseExceptionFilter = class MongooseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        response.status(418).json({
            statusCode: 418,
            message: exception.code,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
MongooseExceptionFilter = __decorate([
    common_1.Catch(mongodb_1.MongoError)
], MongooseExceptionFilter);
exports.MongooseExceptionFilter = MongooseExceptionFilter;
//# sourceMappingURL=mongoose-exception.filter.js.map