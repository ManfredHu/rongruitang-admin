import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET', 'secretKey'),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    // https://blog.leapoahead.com/2015/09/06/understanding-jwt/
    // iss: 该JWT的签发者
    // sub: 该JWT所面向的用户
    // aud: 接收该JWT的一方
    // exp(expires): 什么时候过期，这里是一个Unix时间戳
    // iat(issued at): 在什么时候签发的
    return { userId: payload.sub, username: payload.username };
  }
}
