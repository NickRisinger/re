import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UseAuthGuard, UseRefreshTokenGuard } from '~/common/guards';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);

    response.cookie('accessToken', tokens.accessToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });

    response.send(tokens);
  }

  @UseAuthGuard()
  @Get('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    await this.authService.logout(request.user['sub']);

    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');

    response.sendStatus(200);
  }

  @UseRefreshTokenGuard()
  @Get('refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const userId = request.user['sub'];
    const refreshToken = request.user['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    response.cookie('accessToken', tokens.accessToken);
    response.cookie('refreshToken', tokens.refreshToken);

    response.send(tokens);
  }
}
