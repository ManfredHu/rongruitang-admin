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
import { User } from './user/user.entity';

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

  // curl -X POST http://localhost:9000/auth/login -d '{"username": "ff", "password": "ff"}' -H "Content-Type: application/json"
  @ApiOperation({ summary: '用户名密码登陆' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.User)
    return "ok"
  }
}
