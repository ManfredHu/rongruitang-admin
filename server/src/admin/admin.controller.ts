import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity'
import { CreateAdminInput } from './dto/create-admin.input'

// https://docs.nestjs.com/techniques/serialization
@UseInterceptors(ClassSerializerInterceptor) // 可以支持实体@Exclude()属性，过滤password字段返回
@ApiTags('管理员')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [Admin] })
  @Post('register')
  register(@Body() createAdmin: CreateAdminInput) {
    return this.adminService.register(createAdmin);
  }
}
