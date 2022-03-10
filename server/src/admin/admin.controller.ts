import {
  Get,
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity'
import { RegisterAdminInput } from './dto/register-admin.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// https://docs.nestjs.com/techniques/serialization
@UseInterceptors(ClassSerializerInterceptor) // 可以支持实体@Exclude()属性，过滤password字段返回
@ApiTags('管理员')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: '注册管理' })
  @ApiResponse({ status: 0, type: [Admin] })
  @Post('register')
  register(@Body() createAdmin: RegisterAdminInput) {
    return this.adminService.register(createAdmin);
  }

  @ApiOperation({ summary: '查找管理' })
  @ApiResponse({ status: 0, type: Admin })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(JwtAuthGuard)
  @Get('findOneAdminByName')
  findOneAdminByName(@Query('username') username: string) {
    return this.adminService.findOneAdminByName(username);
  }
}
