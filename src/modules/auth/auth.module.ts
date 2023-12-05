import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@auth/strategies';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
