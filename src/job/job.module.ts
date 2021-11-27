import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';
import { JobSchema } from './schema/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Job', schema: JobSchema },
    ]),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
