import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/api.keys';

@Module({
  imports: [UserModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
