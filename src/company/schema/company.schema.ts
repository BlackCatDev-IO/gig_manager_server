import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  title: String,
  email: [String],
  phoneNumber: String,
  address: String,
});
