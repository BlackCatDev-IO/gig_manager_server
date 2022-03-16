import * as mongoose from 'mongoose';
import { CompanySchema } from '../../company/schema/company.schema';
import { JobSchema } from '../../job/schema/job.schema';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number,
  accountCreatedDate: Date,
  rate: Number,
  companies: [CompanySchema],
  jobs: [JobSchema],
});
