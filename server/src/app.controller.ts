import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './user/user.entity';
import type {
  LoginInfo
} from './common/types/login'


@ApiTags('基础')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 抛出异常 with String
  @Get('stringerror')
  async forbidden() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  // 抛出异常 with Object
  @Get('recorderror')
  async error2() {
    throw new HttpException(
      {
        code: -2,
        msg: '发生错误',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
