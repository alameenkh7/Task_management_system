import * as postgresDriver from 'pg';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';

export function getConfig(): DataSourceOptions {
  return {
    driver: postgresDriver,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tms',
    password: 'password',
    database: 'task_management',
    synchronize: false,
    migrations: [
      path.join(__dirname, '..', '..', 'src/migrations', '*.{ts,js}'),
    ],
    entities: [path.join(__dirname, '..', '**', 'entity', '*.{ts,js}')],
  } as DataSourceOptions;
}
