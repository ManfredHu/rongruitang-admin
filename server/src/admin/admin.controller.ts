import {
  Get,
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity'
import { RegisterAdminInput } from './dto/register-admin.input';

// https://docs.nestjs.com/techniques/serialization
@UseInterceptors(ClassSerializerInterceptor) // 可以支持实体@Exclude()属性，过滤password字段返回
@ApiTags('管理员')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: '注册管理' })
  @ApiResponse({ status: 201, type: [Admin] })
  @Post('register')
  register(@Body() createAdmin: RegisterAdminInput) {
    return this.adminService.register(createAdmin);
  }

  @ApiOperation({ summary: '查找管理' })
  @ApiResponse({ status: 200, type: Admin })
  @Get('findOneAdminByName')
  findOneAdminByName(@Query('username') username: string) {
    return this.adminService.findOneAdminByName(username);
  }
}
