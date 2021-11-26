export class CreateJobDto {
  userId: number;
  jobCode?: string;
  jobTitle: string;
  location?: string;
  description?: string;
  startData: Date;
  endDate: Date;
  callTime?: Date;
}
