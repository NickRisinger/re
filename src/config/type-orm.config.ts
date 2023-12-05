import * as dotenv from 'dotenv';
dotenv.config({ path: './envs/.env' });

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const logger = new Logger('TypeOrm');

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  ...dataSourceOptions,
  synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
  logging: configService.get<boolean>('DATABASE_LOGGING'),
  logger: logger.log.bind(logger),
});

export default dataSource;
