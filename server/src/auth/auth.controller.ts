import { Controller, Post, UseGuards, Request, Get, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginInfo } from 'src/common/types/login';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiProperty } from '@nestjs/swagger';
import { LoginInput } from './dto/login.input'

@UseInterceptors(ClassSerializerInterceptor) // 可以支持实体@Exclude()属性，过滤password字段返回
@ApiTags('身份验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // curl -X POST http://localhost:9000/auth/login -d '{"username": "ff", "password": "ff"}' -H "Content-Type: application/json"
  // return {"data":{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZmIiwic3ViIjoiNjIyODlkNDY2YjNmOTRjZjRhNTVhZjZlIiwiaWF0IjoxNjQ2ODk5ODMxLCJleHAiOjE2NDY4OTk4OTF9.1_Avncn7jeNJLp_zYVHlOoOcuP2zWgqXGB-yNthVEiQ"},"code":0,"msg":""}
  @ApiOperation({ summary: '登陆' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginInput, @Request() req) {
    console.log(`login user`, user);
    // return req.user // {"data":{"userId":"62289d466b3f94cf4a55af6e","username":"ff","createTime":"2022-03-09T12:27:50.000Z"},"code":0,"msg":""}
    return this.authService.login(req.user as LoginInfo);
  }

  // curl http://localhost:9000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZmIiwic3ViIjoiNjIyODlkNDY2YjNmOTRjZjRhNTVhZjZlIiwiaWF0IjoxNjQ2OTAzMTE1LCJleHAiOjE2NDY5MTc1MTV9.X1pkaVGKT0yU4NvjyLv_eg2Yt48rLtO5nuOp5K6jAZ0"
  // {"data":{"userId":"62289d466b3f94cf4a55af6e","username":"ff"},"code":0,"msg":""}
  @ApiOperation({ summary: '验access_token' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
