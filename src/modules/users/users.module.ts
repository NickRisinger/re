import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService, TokenService } from '@users/services';
import { UsersController } from '@users/users.controller';
import { User } from '@users/entities/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService, TokenService],
})
export class UsersModule {}
