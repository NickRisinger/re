import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Body() loginDto: LoginDto,
  ) {
    const tokens = await this.authService.login(loginDto);

    response.cookie('accessToken', tokens.accessToken);
    response.cookie('refreshToken', tokens.refreshToken);

    return loginDto;
  }

  @Get('logout')
  logout() {}

  @Get('refresh')
  refresh() {}
}
