import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packgaeJson from '../../package.json';
import { svrConfig } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局接口前缀
  // app.setGlobalPrefix('api');
  
  // 拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion(packgaeJson.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // 打开 http://localhost:9080/docs 就可以看到文档了

  await app.listen(svrConfig.port);
  Logger.log(
    `🚀 Server running on http://localhost:${svrConfig.port}`,
    'Bootstrap',
  );
}
bootstrap();
