import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tms',
    password: 'password',
    name: 'task_management',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: false,
  };
};
