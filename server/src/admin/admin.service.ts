import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { MongoRepository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: MongoRepository<Admin>,
  ) {}

  create(createAdminInput: CreateAdminInput) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  update(id: number, updateAdminInput: UpdateAdminInput) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  /**
   * admin注册
   * @param createAdmin
   * @returns
   */
  async register(createAdmin: CreateAdminInput) {
    const { username } = createAdmin;

    // 用户名查找
    const existUser = await this.adminRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.OK);
    }

    const newUser = this.adminRepository.create(createAdmin);
    Logger.log(
      `server/src/admin/admin.service.ts ${JSON.stringify(
        createAdmin,
      )} ${existUser}`,
    );
    return await this.adminRepository.save(newUser);
  }

  async findOneAdminByName(username: string) {
    Logger.log(`findOneAdminByName username: ${username}`);

    const existUser = await this.adminRepository.findOne({
      where: { username },
    });
    if (!existUser) {
      throw new HttpException('管理不存在', HttpStatus.OK);
    }
    return existUser;
  }

  async validateUser(username: string): Promise<Admin | null> {
    Logger.log(`server/src/admin/admin.service.ts validateUser ${username}`);

    //  TypeORMError: Query Builder is not supported by MongoDB.
    //  const admin = await this.adminRepository
    //   .createQueryBuilder('admin')
    //   .addSelect('admin.password')
    //   .where('admin.username=:username', { username })
    //   .getOne();

    const existUser = await this.adminRepository.findOne({
      where: { username },
    });
    
    return existUser ? existUser: null;
  }
}
