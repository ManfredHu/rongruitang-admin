import { ConsoleLogger, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Admin } from 'src/admin/entities/admin.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // validate方法自动执行
  // 用户名密码验证
  async validate(
    username: string,
    password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    Logger.log(
      `server/src/auth/strategies/local.strategy.ts validate: ${username} ${password} ${JSON.stringify(
        user,
      )}`,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    // filter password return
    // will be mounted to req.user
    return {
      userId: user.id.toHexString(),
      username: user.username,
      createTime: user.id.getTimestamp()
    }
  }
}
