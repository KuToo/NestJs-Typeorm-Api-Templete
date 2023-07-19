import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //实例化应用
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true 
  });
  //日志
  app.useLogger(app.get(Logger));
  //路由前缀
  app.setGlobalPrefix('api');
  //全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  //全局验证器管道
  app.useGlobalPipes(new ValidationPipe());
  
  const port = 3000;
  await app.listen(port);
}
bootstrap();
