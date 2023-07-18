import { ArgumentsHost, Catch, ExceptionFilter, HttpException, LoggerService } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    //响应
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
    });
  }
}
