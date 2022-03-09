import { ConsoleLogger, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // 用户名密码验证
  async validate(username: string, password: string): Promise<any> {
    Logger.log(`server/src/auth/strategies/local.strategy.ts validate: ${username} ${password}`);
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}
