import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';''

@ApiTags('基础')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('stringerror')
  async forbidden() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

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
