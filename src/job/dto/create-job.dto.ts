import { Company } from 'src/company/entities/company.entity';

export class CreateJobDto {
  userId: number;
  company: Company;
  jobCode?: string;
  jobTitle: string;
  location?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  callTime?: Date;
}
