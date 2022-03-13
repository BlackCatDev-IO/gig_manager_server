import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      keepAlive: true,
      connectTimeoutMS: 30000,
      useUnifiedTopology: true,
    }),
    UserModule,
    JobModule,
    CompanyModule,
    InvoiceModule,
    FileModule,
  ],
})
export class AppModule {}
