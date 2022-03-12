import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDoc } from './entities/user.doc';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDoc>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDoc> {
    const newUser = await this.userModel.create(createUserDto);

    return await newUser.save();
  }

  async findAll(): Promise<UserDoc[]> {
    const allUsers = await this.userModel.find().exec();
    return allUsers;
  }

  async findOne(id: string): Promise<UserDoc> {
    const user = await this.userModel.findById(id).exec();

    return user;
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDoc> {
    const user = await this.userModel.findByIdAndUpdate(
      updateUserDto.id,
      updateUserDto,
      { new: true },
    );

    return user;
  }

  async deleteUser(id: string): Promise<UserDoc> {
    const deletedUser = await this.userModel.findById(id);
    console.log(deletedUser);

    await this.userModel.deleteOne({ id: id });
    return deletedUser;
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email });
    return user != null;
  }
}
