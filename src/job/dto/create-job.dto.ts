export class CreateJobDto {
  userId: number;
  jobCode?: string;
  jobTitle: string;
  location?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  callTime?: Date;
}
