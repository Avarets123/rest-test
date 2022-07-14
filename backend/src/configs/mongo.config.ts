import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongoConfig = (): MongooseModuleAsyncOptions => {
  return {
    useFactory: (config: ConfigService) => ({
      // uri: getMongoConfigString(config),
      uri: 'mongodb://osman:123@db_mongo:27017',
    }),
    imports: [ConfigModule],
    inject: [ConfigService],
  };
};

const getMongoConfigString = (config: ConfigService) =>
  'mongodb://' +
  config.get('MONGO_DB_USER') +
  ':' +
  config.get('MONGO_DB_PASSWORD') +
  '@' +
  config.get('MONGO_DB_HOST') +
  ':' +
  config.get('MONGO_DB_PORT');
