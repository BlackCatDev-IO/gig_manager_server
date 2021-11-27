import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateJobDto } from 'src/job/dto/create-job.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.userService.create(createUserDto);
  }

  @Get('/all')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Post('/find')
  checkIfUserExists(@Body('email') email: string): Promise<boolean> {
    console.log(email);

    return this.userService.userExists(email);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id')
  createJob(@Param('id') id: string, @Body() createJobDto: CreateJobDto) {
    console.log(createJobDto);

    return this.userService.addNewJob(id, createJobDto);
  }
}
