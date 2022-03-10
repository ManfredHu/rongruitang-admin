import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { dbconfig } from './config/mongodb'
import { AdminModule } from './admin/admin.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from './config/env';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration#schema-validation
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    // for static files on https://docs.nestjs.com/recipes/serve-static
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../../client'),
    //   exclude: ['/api*', '/graphql*', '/docs*'], // https://github.com/nestjs/nest/blob/master/sample/24-serve-static/src/app.module.ts
    // }),
    // https://docs.nestjs.com/graphql/quick-start
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'], // typePath属性指示GraphQLModule应在何处查找您要编写的GraphQL SDL架构定义文件。这些文件将在内存中合并；这允许您将架构拆分成几个文件，并将它们定位在它们的解析器附近
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // apollo-server plugin
    }),
    // https://typeorm.bootcss.com/connection-options#mongodb
    // TypeOrmModule.forRoot(dbconfig as TypeOrmModuleOptions),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb', // type，还有mysql等
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
        synchronize: true,
        useNewUrlParser: true,
        logging: true,
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 27017), // 端口号
        database: configService.get('DB_DATABASE', ''), //数据库名
      }),
    }),
    UserModule,
    AdminModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
