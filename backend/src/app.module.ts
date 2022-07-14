import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { configJwt } from './configs/jwt.config';
import { mongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig()),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    UserModule,
  ],
})
export class AppModule {}
