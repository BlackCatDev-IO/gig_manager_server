import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateResult } from 'mongodb';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { DeleteJobDto } from './dto/delete-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly jobModel: Model<Job>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async addJob(createJobDto: CreateJobDto): Promise<Job> {
    const id = createJobDto.userId;
    const user = await this.userModel.findById(id);
    const newJob = new this.jobModel(createJobDto);
    const userJobList: Job[] = user.jobs ?? [];
    userJobList.push(newJob);
    const updatedUser = { jobs: userJobList };
    await this.userModel.findByIdAndUpdate(id, updatedUser);
    return newJob;
  }

  async listAllJobs(id: string): Promise<Job[]> {
    const user = await this.userModel.findById(id);
    return user.jobs;
  }

  async findAllJobs(id: string): Promise<Job[]> {
    const user = await this.userModel.findById(id);
    return user.jobs;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async deleteJob(deleteJobDto: DeleteJobDto): Promise<UpdateResult> {
    return await this.userModel.updateOne(
      { _id: deleteJobDto.userId },
      { $pull: { jobs: { _id: deleteJobDto.jobId } } },
    );
  }
}
