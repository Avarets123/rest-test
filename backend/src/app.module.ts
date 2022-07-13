import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig()),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
  ],
})
export class AppModule {}
