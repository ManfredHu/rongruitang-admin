import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // for static files on https://docs.nestjs.com/recipes/serve-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../dist/client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
