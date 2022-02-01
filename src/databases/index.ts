import config from 'config';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';

const { host, user, password, database }: dbConfig = config.get('dbConfig');
export const dbConnection: ConnectionOptions = {
  type: 'mysql',
  host: host,
  port: 3306,
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: true,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
