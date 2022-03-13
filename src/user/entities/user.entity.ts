import { Job } from 'src/job/entities/job.entity';
import { Document, Types } from 'mongoose';
import { PartialType } from '@nestjs/mapped-types';

export class User extends PartialType(Document) {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: number;
  rate?: number;
  jobs?: Job[];
  companies?: string[];
  files?: Types.ObjectId[];
}
