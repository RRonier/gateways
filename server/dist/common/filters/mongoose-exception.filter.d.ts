import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';
export declare class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost): void;
}
