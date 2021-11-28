import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DeleteJobDto } from './dto/delete-job.dto';
import { UpdateResult } from 'mongodb';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    console.log(createJobDto.userId);
    return this.jobService.addJob(createJobDto);
  }

  @Get('/all/:id')
  findAll(@Param('id') id: string) {
    return this.jobService.findAllJobs(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete('delete')
  remove(@Body() deleteJobDto: DeleteJobDto): Promise<UpdateResult> {
    return this.jobService.deleteJob(deleteJobDto);
  }

  @Put('/add')
  createJob(@Body() createJobDto: CreateJobDto) {
    console.log(createJobDto.userId);
    return this.jobService.addJob(createJobDto);
  }
}
