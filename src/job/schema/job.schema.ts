import * as mongoose from 'mongoose';
import { CompanySchema } from 'src/company/schema/company.schema';

export const JobSchema = new mongoose.Schema({
  company: CompanySchema,
  jobCode: String,
  jobTitle: String,
  location: String,
  description: String,
  startDate: Date,
  endDate: Date,
  callTime: Date,
});
