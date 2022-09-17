import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const {
  host,
  port,
  username,
  password,
  database,
  synchronize,
} = config.get('db');

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  synchronize,
  autoLoadEntities: true
}
