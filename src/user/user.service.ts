import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from 'src/job/dto/create-job.dto';
import { Job } from 'src/job/entities/job.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Job') private readonly jobModel: Model<Job>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return result;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return user;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findById(id);
    console.log(deletedUser);

    await this.userModel.deleteOne({ _id: id });
    return deletedUser;
  }

  async listAllJobs(id: string): Promise<Job[]> {
    const user = await this.userModel.findById(id);
    return user.jobs;
  }

  async addNewJob(id: string, createJobDto: CreateJobDto): Promise<Job> {
    const user = await this.userModel.findById(id);

    const newJob = new this.jobModel(createJobDto);
    const userJobList: Job[] = user.jobs ?? [];
    userJobList.push(newJob);
    const updatedUser = { jobs: userJobList };
    await this.userModel.findByIdAndUpdate(id, updatedUser);
    console.log(user);

    // this.update(id, updatedUser);
    // const result = await newJob.save();
    return newJob;
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email });
    return user != null;
  }
}
