export class Job {
  id?: number;
  jobCode?: string;
  jobTitle: string;
  location: string;
  description?: string;
  startData: Date;
  endDate: Date;
  callTime?: Date;
}
