import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewayModule } from './gateway/gateway.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    GatewayModule,
    DeviceModule,
    MongooseModule.forRoot('mongodb://localhost/gateways', {
      useCreateIndex: true,
      useFindAndModify: true,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-timestamp'));
        return connection;
      },
    }),
  ],
})
export class AppModule {}
