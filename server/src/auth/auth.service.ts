import { Injectable, Logger } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcryptjs';
import { salt } from 'src/config/admin';
@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const admin = await this.adminService.validateUser(username);
    if (!admin) return null;
    Logger.log(`auth find user ${JSON.stringify(admin)} ${password}`);

    // password compare https://segmentfault.com/a/1190000008841988
    const rst = bcrypt.compareSync(password, admin.password);
    Logger.log(`server/src/auth/auth.service.ts bcrypt.compareSync ${rst}`);
    if (rst) return rst;
    return null;
  }
  //   create(createAuthDto: CreateAuthDto) {
  //     return 'This action adds a new auth';
  //   }

  //   findAll() {
  //     return `This action returns all auth`;
  //   }

  //   findOne(id: number) {
  //     return `This action returns a #${id} auth`;
  //   }

  //   update(id: number, updateAuthDto: UpdateAuthDto) {
  //     return `This action updates a #${id} auth`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} auth`;
  //   }
}
