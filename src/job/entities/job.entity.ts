export class Job {
  id?: string;
  jobCode?: string;
  jobTitle: string;
  location: string;
  description?: string;
  startData: Date;
  endDate: Date;
  callTime?: Date;
}
