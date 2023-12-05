import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(signInDto: SignInDto) {
    return signInDto;
  }

  @Get('logout')
  logout() {}

  @Get('refresh')
  refresh() {}
}
