import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromHeader('refreshToken'),
      ]),
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        done(null, configService.get<string>('JWT_ACCESS_SECRET'));
      },
      passReqToCallback: true,
    });
  }

  private static extractJwtFromCookie(request: Request) {
    if (request.cookies && 'refreshToken' in request.cookies) {
      return request.cookies['refreshToken'];
    }
    return null;
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
