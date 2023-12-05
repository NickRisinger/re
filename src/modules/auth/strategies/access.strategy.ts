import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
  sub: number;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('accessToken'),
      ]),
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        done(null, configService.get<string>('JWT_ACCESS_SECRET'));
      },
    });
  }

  private static extractJwtFromCookie(request: Request) {
    if (request.cookies && 'accessToken' in request.cookies) {
      return request.cookies['accessToken'];
    }
    return null;
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
