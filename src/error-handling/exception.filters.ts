import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

import { CustomHttpExceptionResponse } from './http-exception-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse: CustomHttpExceptionResponse = {
      statusCode: status,
      errorMessage: exception.message,
      timeStamp: new Date(),
    };

    response.status(status).json(errorResponse);
  }
}
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log(status);

    const errorResponse: CustomHttpExceptionResponse = {
      statusCode: status,
      errorMessage: exception.message,
      timeStamp: new Date(),
    };

    response.status(status).json(errorResponse);
  }
}

@Catch(TypeError)
export class TypeExceptionFilter implements ExceptionFilter {
  catch(exception: TypeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponse: CustomHttpExceptionResponse = {
      statusCode: 400,
      errorMessage: 'An error occured',
      timeStamp: new Date(),
    };

    response.status(400).json(errorResponse);
  }
}
