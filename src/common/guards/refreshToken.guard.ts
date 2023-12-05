import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function UseRefreshTokenGuard(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard('jwt-refresh')));
}
