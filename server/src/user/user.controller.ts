import { Controller, Logger, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() {
    return {
      name: 'test',
      age: 100
    }
  }

  @Get('createUser')
  async createUser(): Promise<User | boolean>  {
    console.log('user controller exec');
    const rst = await this.userService.create({
      username: 'ManfredHu',
      password: '123',
    });
    Logger.log('createUser rst', rst);
    if (rst) {
      return rst;
    }
    return false;
  }
}
