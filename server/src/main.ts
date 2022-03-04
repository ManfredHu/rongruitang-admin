import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
