import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';
import { DatabaseModule } from '~/database/database.module';
import { AgenciesModule } from './modules/agencies/agencies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '/envs/.env' }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    AgenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
