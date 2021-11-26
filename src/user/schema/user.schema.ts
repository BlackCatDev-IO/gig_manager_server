import * as mongoose from 'mongoose';
import { CompanySchema } from 'src/company/schema/company.schema';
import { JobSchema } from 'src/job/schema/job.schema';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  rate: Number,
  phoneNumber: Number,
  companies: [CompanySchema],
  jobs: [JobSchema],
});
