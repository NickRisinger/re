import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function UseAuthGuard(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
