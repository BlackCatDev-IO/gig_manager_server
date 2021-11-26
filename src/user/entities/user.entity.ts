import { Job } from 'src/job/entities/job.entity';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: number;
  rate?: number;
  jobs?: [Job];
  companies?: [string];
}
