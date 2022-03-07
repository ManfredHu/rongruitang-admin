import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { MongoRepository, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly adminRepository: MongoRepository<Admin>) {}

  create(createAdminInput: CreateAdminInput) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminInput: UpdateAdminInput) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async register(createAdmin: CreateAdminInput) {
    const { username } = createAdmin;

    // 用户名查找
    const existUser = await this.adminRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.adminRepository.create(createAdmin);
    console.log(`register`, createAdmin, existUser);
    return await this.adminRepository.save(newUser);
  }
}
