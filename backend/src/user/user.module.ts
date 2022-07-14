import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { configJwt } from 'src/configs/jwt.config';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { User, UserSchema } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.registerAsync(configJwt()),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, JwtModule],
})
export class UserModule {}
