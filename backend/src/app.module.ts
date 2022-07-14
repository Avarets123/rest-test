import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './configs/mongo.config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig()),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
