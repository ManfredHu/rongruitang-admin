import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { compareSync } from 'bcryptjs';
// import { salt } from 'src/config/admin';
import { JwtService } from '@nestjs/jwt';
// import { MongoRepository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import type {
  LoginInfo
} from '../common/types/login'
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Admin> {
    const admin = await this.adminService.validateUser(username);

    Logger.log(`auth find user ${JSON.stringify(admin)} ${password}`);
    if (!admin) throw new BadRequestException('用户名不正确');

    // password compare https://segmentfault.com/a/1190000008841988
    const rst = compareSync(password, admin.password);
    Logger.log(`server/src/auth/auth.service.ts bcrypt.compareSync ${rst}`);
    if (!rst) throw new BadRequestException('密码错误');

    // 返回除了password的其他信息
    return admin;
  }

  async login(user: LoginInfo) {
    // https://blog.leapoahead.com/2015/09/06/understanding-jwt/
    // iss: 该JWT的签发者
    // sub: 该JWT所面向的用户
    // aud: 接收该JWT的一方
    // exp(expires): 什么时候过期，这里是一个Unix时间戳
    // iat(issued at): 在什么时候签发的
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
