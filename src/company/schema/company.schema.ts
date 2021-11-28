import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  title: { required: true, type: String },
  email: { required: false, type: String },
  phoneNumber: { required: false, type: String },
  address: { required: false, type: String },
});
