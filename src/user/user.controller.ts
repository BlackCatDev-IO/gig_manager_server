import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HttpExceptionFilter } from 'src/error-handling/exception.filters';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from 'src/error-handling/custom-exceptions';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.userExists(createUserDto.email)) {
      throw new UserAlreadyExistsException(createUserDto.email);
    }
    return await this.userService.createUser(createUserDto);
  }

  @Get('/all')
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/find')
  async checkIfUserExists(@Body('email') email: string): Promise<boolean> {
    return await this.userService.userExists(email);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const dto = updateUserDto;
    dto.id = id;
    const user = await this.userService.update(dto);
    if (user === null) {
      throw new UserNotFoundException();
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user === null) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
