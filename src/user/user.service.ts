import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private readonly logger = new Logger(UserService.name);

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.accountCreatedDate = new Date();

    const newUser = await this.userModel.create(createUserDto);

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(error.message, 404);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, 404);
    }
  }

  async query(query: any): Promise<User[]> {
    try {
      const result = await this.userModel.find(query);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userModel
        .findByIdAndUpdate(updateUserDto.id, updateUserDto, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, 404);
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findById(id).exec();

      await this.userModel.findByIdAndDelete(deletedUser._id).exec();
      return deletedUser;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(error.message, 404);
    }
  }

  async userExists(email: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();

      return user != null;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(error.message, 404);
    }
  }
}
