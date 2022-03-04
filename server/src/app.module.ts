import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // for static files on https://docs.nestjs.com/recipes/serve-static
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../dist/client'),
    // }),
    // https://docs.nestjs.com/graphql/quick-start
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'], // typePath属性指示GraphQLModule应在何处查找您要编写的GraphQL SDL架构定义文件。这些文件将在内存中合并；这允许您将架构拆分成几个文件，并将它们定位在它们的解析器附近
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // apollo-server plugin
    }),
    TypeOrmModule.forRoot({
      database: 'dearmydbs', // dbs名，默认test
      type: 'mongodb', // type，还有mysql等
      url: 'mongodb://localhost:27017/?readPreference=primary&ssl=false',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
