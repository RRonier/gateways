"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const nestjs_redoc_1 = require("nestjs-redoc");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Managing Gateways')
        .setDescription('The managing gateways API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    const redocOptions = {
        title: 'Docs API Gateways',
        logo: {
            url: 'https://redocly.github.io/redoc/petstore-logo.png',
            backgroundColor: '#F0F0F0',
            altText: 'PetStore logo',
        },
        sortPropsAlphabetically: true,
        hideDownloadButton: false,
        hideHostname: false,
        expandResponses: 'all',
        hideLoading: false,
    };
    await nestjs_redoc_1.RedocModule.setup('/api-docs', app, document, redocOptions);
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map