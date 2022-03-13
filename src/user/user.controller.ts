import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/add')
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.userExists(createUserDto.email)) {
      throw new ConflictException(
        `An account with email ${createUserDto.email} already exists`,
      );
    }
    return this.userService.createUser(createUserDto);
  }

  @Get('/all')
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/find')
  async checkIfUserExists(@Body('email') email: string): Promise<boolean> {
    console.log(email);

    return this.userService.userExists(email);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const dto = updateUserDto;
    dto.id = id;
    return this.userService.update(dto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
