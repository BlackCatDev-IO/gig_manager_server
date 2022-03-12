import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDoc } from './entities/user.doc';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, // private readonly fileService: FileService,
  ) {}

  @Post('/add')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/all')
  async findAllUsers(): Promise<UserDoc[]> {
    return this.userService.findAll();
  }

  @Post('/find')
  async checkIfUserExists(@Body('email') email: string): Promise<boolean> {
    console.log(email);

    return this.userService.userExists(email);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string): Promise<UserDoc> {
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
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
