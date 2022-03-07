import {
  Controller,
  Logger,
  Get,
  HttpStatus,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: '测试'})
  @Get()
  getHello() {
    return {
      name: 'test',
      age: 100,
    };
  }

  @ApiOperation({summary: '创建用户'})
  @Get('createUser')
  async createUser(): Promise<User | boolean> {
    const rst = await this.userService.create({
      username: 'ManfredHu',
      password: '123',
    });
    Logger.log('createUser rst', JSON.stringify(rst));
    if (rst) {
      return rst;
    }
    return false;
  }
}
