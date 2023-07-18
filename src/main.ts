import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true 
  });
  app.useLogger(app.get(Logger));
  //设置路由前缀
  app.setGlobalPrefix('api');

  //全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const port = 3000;
  await app.listen(port);
}
bootstrap();
