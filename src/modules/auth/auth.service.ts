import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { LoginDto } from '@auth/dtos';
import { UsersService, TokenService } from '@users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailOrLogin(loginDto.login);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await this.tokenService.verifyHash(
      user.passwordHash,
      loginDto.password,
    );

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.tokenService.generateTokens({
      sub: user.id,
      login: user.login,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    // TODO: Сделать создание токена под каждое устройство
    return tokens;
  }

  async logout(id: number) {
    // TODO: Сделать создание токена под каждое устройство
    return this.usersService.update(id, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.tokenService.generateTokens({
      sub: user.id,
      login: user.login,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.tokenService.hashData(refreshToken);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);
  }
}
